## BIBLIOTECAS ##

import os
from dotenv import load_dotenv

from flask import Flask, session, request, jsonify, send_from_directory
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer
from flask_session import Session
import psycopg2
from psycopg2 import sql
import pandas as pd
from sqlalchemy import create_engine
import io
import base64
import matplotlib.pyplot as plt
import seaborn as sns
from werkzeug.security import check_password_hash, generate_password_hash
import json
import sys
import os

# Adiciona o diretório atual ao PATH do Python
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from .helpers import login_required

############################################################################

## CONFIGURAÇÕES ##

# Carrega as variáveis do arquivo .env
load_dotenv()
key = os.getenv('SECRET_KEY')
email = os.getenv("EMAIL")
senha = os.getenv("PASSWORD")
db_url = os.getenv("DATABASE_URL")

####### caso deseje utilizar banco de dados local
#db_host = os.getenv("DB_HOST")
#db_name = os.getenv("DB_NAME")
#db_user = os.getenv("DB_USER")
#db_password = os.getenv("DB_PASSWORD")
#conn = psycopg2.connect(
#    dbname=db_name,
#    user=db_user,
#    password=db_password, # excluir para testes
#    host=db_host,
#    port='5432'
#)

# Configure app
app = Flask(__name__, static_folder="../frontend/dist")
app.config['SECRET_KEY'] = key

# Configurar integração com front-end React

# Servir o frontend React em produção
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join('../frontend/dist', path)):
        return send_from_directory('../frontend/dist', path)
    else:
        return send_from_directory('../frontend/dist', 'index.html')

# Configurar sessão para que armazenamento de dados seja feito no servidor, e não através de cookies (navegador)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configurações de e-mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Servidor de e-mail
app.config['MAIL_PORT'] = 587                # Porta do servidor
app.config['MAIL_USE_TLS'] = True            # TLS para segurança
app.config['MAIL_USERNAME'] = email
app.config['MAIL_PASSWORD'] = senha
app.config['MAIL_DEFAULT_SENDER'] = email

mail = Mail(app)

# Configurar serializer para gerar e validar tokens
serializer = URLSafeTimedSerializer(app.config['MAIL_PASSWORD'])

# Connect to the PostgreSQL database
try:
    conn = psycopg2.connect(db_url, sslmode='require')
    print("Conexão com o banco de dados estabelecida!")
except psycopg2.OperationalError as e:
    print(f"Erro ao conectar ao banco de dados: {e}")

# SQLAlchemy
url = db_url
engine = create_engine(url)

# Configure o backend do Matplotlib para evitar GUIs
plt.switch_backend('Agg')

# Função para ser processada após cada solicitação e antes de enviar resposta
@app.after_request # Garantir respostas atualizadas
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

###########################################################################

## DADOS ARMAZENADOS NA SESSÃO DO USUÁRIO: ##

# username do usuário -> session["username"]
# nome da tabela com todas as vacas -> session["vacas"]
# número de vacas cadastradas -> session["num_vacas"]

############################################################################

## ROUTES ##


@app.route("/contato", methods=["POST"])
def contato():

    # Formulário de contato enviado
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    assunto = data.get("assunto")
    nome = data.get("nome")
    email = data.get("email")
    telefone = data.get("telefone")
    mensagem = data.get("mensagem")

    # Campos vazios
    if not assunto or not nome or not email or not telefone or not mensagem:
        return jsonify({"success": False, "message": "Preencher todos os campos"}), 400
    
    # Criar email para envio
    msg = Message(
        subject=assunto,
        sender=email,
        recipients=[app.config['MAIL_USERNAME']],  # Destinatário é o email configurado no app.config
        body=f'''
        Mensagem de: {nome}
        Email: {email}
        Telefone: {telefone}
        
        Mensagem:
        {mensagem}
        '''
    )
    mail.send(msg)
    return jsonify({'success': True, 'message': 'E-mail enviado com sucesso!'}), 200


## Register page
@app.route("/signup", methods=["POST"])
def signup():

    # Recuperar dados do cadastro
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")
    confirm = data.get("confirm")

    # Campos vazios
    if not username or not password or not confirm or not email:
        return jsonify({"success": False, "message": "Preencher todos os campos"}) 

    # Criar tabela de users se não existe
    with conn.cursor() as cursor:
        create = '''
        CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(50), hash VARCHAR(255), email VARCHAR(100))
        '''
        cursor.execute(create)
        conn.commit()

    # Retornar apology se nome de usuário já existe
    with conn.cursor() as cursor:
        query_register = '''
        SELECT * FROM users WHERE username = (%s)
        '''
        cursor.execute(query_register, (username,))
        usr = cursor.fetchall()
        if len(usr) != 0:
            return jsonify({"success": False, "message": "Nome de usuário já existe"})
    
    # Retornar apology se e-mail já está cadastrado
    with conn.cursor() as cursor:
        query_email = '''
        SELECT * FROM users WHERE email = (%s)
        '''
        cursor.execute(query_email, (email,))
        em = cursor.fetchall()
        if len(em) != 0:
            return jsonify({"success": False, "message": "E-mail já cadastrado"})
                
        # Retornar apology se senhas não coincidem
        if password != confirm:
            return jsonify({"success": False, "message": "Senhas não coincidem"})
    
    # Inserir novo usuário na tabela users
    with conn.cursor() as cursor:
        hash = generate_password_hash(password, method='pbkdf2', salt_length=16) # Gerar versão criptografada da senha
        query = '''
        INSERT INTO users (username, hash, email) VALUES ((%s), (%s), (%s))
        '''
        values = (username, hash, email)
        cursor.execute(query, values)
        conn.commit()

    # Redirecionar para login
    return jsonify({"success": True, "message": "Cadastro realizado com sucesso"})


## Login page
@app.route("/login", methods=["POST"])
def login():

    # Recuperar dados do login
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    username = data.get('username')
    password = data.get('password')

    # Campos vazios
    if not username or not password:
        return jsonify({"success": False, "message": "Username e password são obrigatórios"}), 400

    # Consultar tabela users por username
    with conn.cursor() as cursor:
        query = '''
        SELECT * FROM users WHERE username = (%s)
        '''
        cursor.execute(query, (username,))
        rows = cursor.fetchall()

        # Garantir que username existe e senha está correta
        if len(rows) != 1 or not check_password_hash(
            rows[0][2], password
        ):
            return jsonify({"success": False, "message": "Nome de usuário e/ou senha inválido"})

        # Criar sessão de usuário logado, armazenando como "key" seu username
        session["username"] = rows[0][1]

        # Criar tabela de vacas se não existe
        tabela_vacas = f'vacas_{session["username"]}'
        session["vacas"] = tabela_vacas # guardar nome da tabela na sessão do usuário
        create_query = sql.SQL('''
        CREATE TABLE IF NOT EXISTS {} (id SERIAL PRIMARY KEY, raca VARCHAR(50), nasc DATE, peso FLOAT)
        ''').format(sql.Identifier(tabela_vacas)) # Comando SQL dinâmico para nome da tabela
        cursor.execute(create_query)
        conn.commit()

        # Guardar número de vacas na sessão do usuário
        count_query = sql.SQL('''
        SELECT COUNT(*) FROM {}
        ''').format(sql.Identifier(session["vacas"]))
        cursor.execute(count_query)
        num_vacas = cursor.fetchall()
        session["num_vacas"] = int(num_vacas[0][0])

        # Redirecionar para tabela vacas
        return jsonify({"success": True, "message": "Login efetuado com sucesso."})

## Esqueci senha
@app.route("/forgot/password", methods=["POST"])
def forgot_password():

    # Recuperar dados inputados
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    email = data.get("email")

    # Garantir que email e senha foram inseridos 
    if not email:
        return jsonify({"success": False, "message": "Inserir e-mail"})
    
    # Consultar tabela users pelo email do usuário
    with conn.cursor() as cursor:
        query = '''
        SELECT username FROM users WHERE email = (%s)
        '''
        cursor.execute(query, (email,))
        rows = cursor.fetchall()

        # Garantir que email está correto
        if len(rows) != 1:
            return jsonify({"success": False, "message": "Email inválido"})
    
    # Enviar e-mail com link para redefinir senha
    token = serializer.dumps(email, salt='password-reset-salt')
    reset_link = f"http://milkmax.com/reset_password/{token}" # link para front-end
    msg = Message('Redefinir sua senha', recipients=[email]) # título
    msg.body = f'Clique no link para redefinir sua senha: {reset_link}' # corpo da mensagem
    mail.send(msg)
    return jsonify({"success": True, "message": "Um link para redefinição de senha foi enviado para o seu e-mail."})
        

## Redefinir senha
@app.route('/reset_password', methods=["POST"])
def reset_password(token):
    
    # Recuperar dados inputados
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    token = data.get("token")
    password = data.get("password")
    confirm = data.get("confirm")

    if not token or not password or not confirm:
        return jsonify({"success": False, "message": "Preencher todos os campos"}), 400

    if password != confirm:
        return jsonify({"success": False, "message": "Senhas não coincidem"}), 400

    try:
        # Validar o token e obter o e-mail
        email = serializer.loads(token, salt='password-reset-salt', max_age=600)  # 10 min de validade
    except:
        return jsonify({"success": False, "message": "Token inválido ou expirado"}), 400
    
    # Atualizar nova senha na tabela users
    hash = generate_password_hash(password, method='pbkdf2', salt_length=16) # Gerar versão criptografada da senha

    # Atualizar registro existente
    with conn.cursor() as cursor:
        query = '''
        UPDATE users SET hash = (%s) WHERE email = (%s)              
        '''
        values = (hash, email)
        cursor.execute(query, values)
        conn.commit()
        return jsonify({"success": True, "message": "Senha redefinida com sucesso."})

## Esqueci usuário
@app.route("/forgot/username", methods=["POST"])
def forgot_username():

    # Recuperar dados inputados
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    email = data.get("email")
    password = data.get("password")

    if not email:
        return jsonify({"success": False, "message": "Inserir e-mail"})
    if not password:
        return jsonify({"success": False, "message": "Inserir senha"})

    # Consultar tabela users
    with conn.cursor() as cursor:
        query = '''
        SELECT * FROM users WHERE email = (%s)
        '''
        cursor.execute(query, (email,))
        rows = cursor.fetchall()

        # Garantir que email e senha estão corretos
        if len(rows) != 1 or not check_password_hash(
            rows[0][2], password
        ):
            return jsonify({"success": False, "message": "E-mail e/ou senha inválido"})

        # Recuperar nome de usuário
        usr = rows[0][1]

        # Enviar e-mail com nome de usuário
        login_link = f"http://milkmax.com/login" # link para login
        msg = Message('Seu nome de usuário', recipients=[email]) # título
        msg.body = f'Seu nome de usuário é: {usr}\n\nIr pra página de login: {login_link}' # corpo da mensagem
        mail.send(msg)
        return jsonify({"success": True, "message": "O nome de usuário foi enviado para o seu e-mail."})


## Página "Vacas"
@app.route("/vacas", methods=["GET", "POST"])
@login_required
def vacas():

    # Escolher período
    if request.method == "POST":
        return jsonify({"success": False, "message": "Período não fornecido"}), 400
    
    # Renderizar tabela
    else:
        with conn.cursor() as cursor:
            query = sql.SQL('''
            SELECT * FROM {}             
            ''').format(sql.Identifier(session["vacas"]))
            cursor.execute(query)
            vacas = cursor.fetchall()
            colunas = [desc[0] for desc in cursor.description]  # Nomes das colunas
            return json.dumps({"success": True, "colunas": colunas, "vacas": vacas}, default=str)
    

## Cadastro de nova vaca
@app.route("/cadastro", methods = ["POST"])
@login_required
def cadastro():

    # Recuperar dados da nova vaca
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    raca = data.get("raca")
    nasc = data.get("nasc")
    peso = data.get("peso")

    if not raca or not nasc or not peso:
        return jsonify({"success": False, "message": "Todos os campos são obrigatórios"}), 400

    # Inserir nova vaca na tabela vacas
    with conn.cursor() as cursor:
        nova_vaca = sql.SQL('''
        INSERT INTO {} (raca, nasc, peso) VALUES ((%s), (%s), (%s))
        ''').format(sql.Identifier(session["vacas"]))
        nova_vaca_values = (raca, nasc, peso)
        cursor.execute(nova_vaca, nova_vaca_values)
        conn.commit()

        # Criar tabela para nova vaca
        session["num_vacas"] += 1
        last_id = sql.SQL('''
        SELECT * FROM {} ORDER BY id DESC LIMIT 1               
        ''').format(sql.Identifier(session["vacas"]))
        cursor.execute(last_id)
        last = int(cursor.fetchall()[0][0])
        nova_tab = f'vaca{last}_{session["username"]}'
        create_table = sql.SQL('''
        CREATE TABLE {} (dia DATE, fase_ciclo VARCHAR(50), leite_quantidade FLOAT, leite_temperatura FLOAT, leite_ph FLOAT)
        ''').format(sql.Identifier(nova_tab))
        cursor.execute(create_table)
        conn.commit()
        return jsonify({"success": True, "message": "Vaca cadastrada com sucesso!"})


## Diário de cada vaca
@app.route("/diario", methods=["POST"])
@app.route("/diario", methods=["POST"])
@login_required
def diario():

    # Recuperar dados inputados
    data = request.get_json()
    # Recuperar dados inputados
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    seletor = request.json.get("seletor")
    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    seletor = request.json.get("seletor")

    if not seletor:
        return jsonify({"success": False, "message": "ID não fornecido"}), 400
    if not seletor:
        return jsonify({"success": False, "message": "ID não fornecido"}), 400

    # Verificar se ID é válido
    with conn.cursor() as cursor:
        seletor = int(data.get("seletor"))
        tab = f'vaca{seletor}_{session["username"]}'
        id_query = sql.SQL('''
        SELECT * FROM {} WHERE id = (%s)
        ''').format(sql.Identifier(session["vacas"]))
        cursor.execute(id_query, (seletor,))
        result = (cursor.fetchall())
        if not result:
            return jsonify({"success": False, "message": "ID inválido"})
        
        # Renderizar tabela
        query = sql.SQL('''
        SELECT * FROM {} ORDER BY dia DESC      
        ''').format(sql.Identifier(tab))
        cursor.execute(query)
        dias = cursor.fetchall()
        colunas = [desc[0] for desc in cursor.description]
        return json.dumps({"success": True, "colunas": colunas, "dias": dias}, default=str)
        

## Registro no diário
@app.route("/registro", methods = ["POST"])
@login_required
def registro():

    # Recuperar dados inputados
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    id = data.get("registro", {}).get("id_vaca")
    dia = data.get("registro", {}).get("dia")
    ciclo = data.get("registro", {}).get("ciclo")
    qtdd = data.get("registro", {}).get("leite_qtdd")
    temp = data.get("registro", {}).get("leite_temp")
    ph = data.get("registro", {}).get("leite_ph")

    id = data.get("registro", {}).get("id_vaca")
    dia = data.get("registro", {}).get("dia")
    ciclo = data.get("registro", {}).get("ciclo")
    qtdd = data.get("registro", {}).get("leite_qtdd")
    temp = data.get("registro", {}).get("leite_temp")
    ph = data.get("registro", {}).get("leite_ph")


    if not id or not dia or not ciclo or not qtdd or not temp or not ph:
        return jsonify({"success": False, "message": "Todos os campos são obrigatórios"}), 400

    # Verificar se id é válido
    with conn.cursor() as cursor:
        tab = f'vaca{id}_{session["username"]}'
        id_query = sql.SQL('''
        SELECT * FROM {} WHERE id = (%s)
        ''').format(sql.Identifier(session["vacas"]))
        cursor.execute(id_query, (id,))
        result = (cursor.fetchall())
        if not result:
            return jsonify({"success": False, "message": "ID inválido"})
        
        # Verificar se data já foi inserida
        dia_query = sql.SQL('''
        SELECT * FROM {} WHERE dia = (%s)                 
        ''').format(sql.Identifier(tab))
        cursor.execute(dia_query, (dia, ))
        result = cursor.fetchall()
        if result:
            # Modificar registro existente
            update_query = sql.SQL('''
            UPDATE {} SET fase_ciclo = (%s), leite_quantidade = (%s), leite_temperatura = (%s), leite_ph = (%s) WHERE dia = (%s)                    
            ''').format(sql.Identifier(tab))
            values = (ciclo, qtdd, temp, ph, dia)
            cursor.execute(update_query, values)
            conn.commit()
        else:
            # Adicionar registro na tabela vaca{id}_{username}
            insert_query = sql.SQL('''
            INSERT INTO {} (dia, fase_ciclo, leite_quantidade, leite_temperatura, leite_ph) VALUES ((%s), (%s), (%s), (%s), (%s))                    
            ''').format(sql.Identifier(tab))
            values = (dia, ciclo, qtdd, temp, ph)
            cursor.execute(insert_query, values)
            conn.commit()

        # Renderizar tabela
        query = sql.SQL('''
        SELECT * FROM {} ORDER BY dia          
        ''').format(sql.Identifier(tab))
        cursor.execute(query)
        dias = cursor.fetchall()
        colunas = [desc[0] for desc in cursor.description]
        return jsonify({"success": True, "colunas": colunas, "dias": dias})


## Página de relatórios
@app.route("/relatorios", methods = ["POST"])
def relatorios():

    # Recuperar dados inputados
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    option = data.get("option")
    select = data.get("select")

    if not option:
        return jsonify({"success": False, "message": "Escolha uma opção"}), 400

    # Analisar relatórios de uma vaca
    if option == "select":
        if not select:
            return jsonify({"success": False, "message": "Nenhum ID inserido"}), 400

        # Verificar se id é válido
        with conn.cursor() as cursor:
            id = int(select)
            tab = f'vaca{id}_{session["username"]}'
            id_query = sql.SQL('''
            SELECT * FROM {} WHERE id = (%s)
            ''').format(sql.Identifier(session["vacas"]))
            cursor.execute(id_query, (id,))
            result = (cursor.fetchall())
            if not result:
                return jsonify({"success": False, "message": "ID inválido"})
            
            # Converter para DataFrame
            query = sql.SQL('''
            SELECT * FROM {}
            ''').format(sql.Identifier(tab))
            cursor.execute(query)
            result = cursor.fetchall()
            if not result:
                return jsonify({"success": False, "message": "Não há registros no diário dessa vaca"})
            as_str = query.as_string(conn)
            df = pd.read_sql_query(as_str, engine)
            # Missing values
            df.isnull()
            df = df.fillna(0)

            ## Descriptive analytics - statistics
            descriptive = df.describe()
            descriptive = descriptive.round(2)
            count = descriptive.iloc[0,1]
            descriptive.drop('count', inplace=True)

            # Verificar se tabela SQL já existe
            descrip_format = f'descriptive_vaca{id}_{session["username"]}'
            descrip_exists = sql.SQL('''
            SELECT EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = (%s)                         
            )''')
            cursor.execute(descrip_exists, (descrip_format, ))
            exists = cursor.fetchone()[0]

            # Criar tabela SQL, caso tabela não exista
            if not exists:
                descriptive.to_sql(descrip_format, con=engine, index=True, index_label="parâmetro", if_exists='replace')

            # Retornar consulta na tabela
            query_descrip = sql.SQL('''
            SELECT * FROM {}
            ''').format(sql.Identifier(descrip_format))
            cursor.execute(query_descrip)
            linhas = cursor.fetchall()
            colunas = [desc[0] for desc in cursor.description]

            ## Descriptive analytics - univariate visualization
            img_paths = []
            for column in df.columns[1:]:
                plt.figure(figsize=(5, 5))
                sns.histplot(df[column], bins=30, kde=False)
                plt.title(column)
                # Salvar a imagem em memória com BytesIO
                img_io = io.BytesIO()
                plt.savefig(img_io, format='png')
                img_io.seek(0)  # Voltar para o início do arquivo
                
                # Converter para base64 para poder renderizar na página HTML
                img_data = base64.b64encode(img_io.getvalue()).decode('utf-8')
                img_paths.append(f"data:image/png;base64,{img_data}")
                
                plt.close()  # Fechar o gráfico
            # Armazenar os gráficos na sessão
            session['img_paths'] = img_paths
            return jsonify({
                    "success": True,
                    "colunas": colunas,
                    "linhas": linhas,
                    "count": count,
                    "img_paths": session["img_paths"]
                })
        
    elif option == "all":
        # Lógica para relatórios de todas as vacas (se necessário)
        return jsonify({"success": False, "message": "Funcionalidade ainda não implementada"}), 501

###############################################################################3

if __name__ == '__main__':
    app.run(debug=True)