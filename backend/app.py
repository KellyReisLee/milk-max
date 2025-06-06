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
from flask_cors import CORS
import traceback

# Adiciona o diretório atual ao PATH do Python
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from helpers import login_required


############################################################################


# Carrega as variáveis do arquivo .env
load_dotenv()
key = os.getenv('SECRET_KEY')
email = os.getenv("EMAIL")
senha = os.getenv("PASSWORD")


############################################################################

## BANCO DE DADOS ##

####### utilizar BANCO DE DADOS REMOTO (opção padrão)
db_url = os.getenv("DATABASE_URL")
backend_url=os.getenv("VITE_BACKEND_URL")

# Connect to the PostgreSQL database
def get_db_connection():
    try:
        conn = psycopg2.connect(db_url)
        return conn
    except psycopg2.OperationalError as e:
        print("Erro ao conectar ao banco de dados:", str(e))
        return None

# SQLAlchemy
url = db_url
engine = create_engine(url)

####### para utilizar BANCO DE DADOS LOCAL, descomente as linhas abaixo e comente as linhas acima (a partir do comentário "utilizar BANCO DE DADOS REMOTO")
####### além disso, não se esqueça de configurar as variáveis de ambiente no arquivo .env
#db_host = os.getenv("DB_HOST")
#db_name = os.getenv("DB_NAME")
#db_user = os.getenv("DB_USER")
#db_password = os.getenv("DB_PASSWORD")

#Connect to the PostgreSQL database
#def get_db_connection():
#   try:
#       conn = psycopg2.connect(
#           dbname=db_name,
#           user=db_user,
#           password=db_password, # excluir caso senha não tenha sido configurada
#           host=db_host,
#           port='5432',
#           sslmode="require"  # Garante que a conexão use SSL
#       )
#       return conn
#   except psycopg2.OperationalError as e:
#        print("Erro ao conectar ao banco de dados:", str(e))
#        return None

#SQLAlchemy
#url = f'postgresql://{db_user}:{db_password}@{db_host}:5432/{db_name}'
#engine = create_engine(url)


############################################################################

## CONFIGURAÇÕES APP ##

# Caminho absoluto para a pasta dist do frontend
FRONTEND_DIST_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist'))

# Configure app
app = Flask(__name__, static_folder=FRONTEND_DIST_PATH)
# Permite requisições para este servidor
CORS(app, supports_credentials=True, resources={r"/*": {"origins": ["http://localhost:5173", 'http://127.0.0.1:5000', "https://milkmax-site.onrender.com"]}})
# Importante para gerenciar sessões (session)
app.config['SECRET_KEY'] = key

# Create static/graphs directory if it doesn't exist
static_graphs_dir = os.path.join(os.path.dirname(__file__), 'static', 'graphs')
if not os.path.exists(static_graphs_dir):
    os.makedirs(static_graphs_dir)

# Configurar integração com front-end React
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(FRONTEND_DIST_PATH, path)):
        return send_from_directory(FRONTEND_DIST_PATH, path)
    else:
        return send_from_directory(FRONTEND_DIST_PATH, 'index.html')
    
# Configure o backend do Matplotlib para evitar GUIs
plt.switch_backend('Agg')

# Função para ser processada após cada solicitação e antes de enviar resposta
@app.after_request # Garantir respostas atualizadas
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    if response.mimetype == 'application/octet-stream' and request.path.endswith('.js'):
        response.mimetype = 'application/javascript'
    return response


############################################################################

## CONFIGURAÇÕES COOKIES ##

# Configurar sessão para que armazenamento de dados seja feito no servidor, e não através de cookies (navegador)
app.config["SESSION_TYPE"] = "filesystem"
# sessão expira quando o navegador é fechado
app.config["SESSION_PERMANENT"] = False
Session(app)

# Garante que cookies só sejam enviados por HTTPS
app.config['SESSION_COOKIE_SECURE'] = True
# Permitir cookies quando backend e frontend estão hospedados em domínios diferentes
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
# Permitir que o frontend acesse o cookie
app.config["SESSION_COOKIE_HTTPONLY"] = False 

# Diretório para armazenamento de sessões
app.config["SESSION_FILE_DIR"] = os.path.join(os.getcwd(), "flask_session")
if not os.path.exists(app.config["SESSION_FILE_DIR"]):
    os.makedirs(app.config["SESSION_FILE_DIR"])  # Cria o diretório se não existir


############################################################################

## CONFIGURAÇÕES DE E-MAIL ##

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

    # Conectar com banco de dados
    conn = None
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"success": False, "message": "Erro ao conectar ao banco de dados"}), 500
        with conn.cursor() as cursor:
            # Criar tabela de users se não existe
            create = '''
            CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(50), hash VARCHAR(255), email VARCHAR(100))
            '''
            cursor.execute(create)
            conn.commit()

            # Retornar apology se nome de usuário já existe
            query_register = '''
            SELECT * FROM users WHERE username = (%s)
            '''
            cursor.execute(query_register, (username,))
            usr = cursor.fetchall()
            if len(usr) != 0:
                return jsonify({"success": False, "message": "Nome de usuário já existe"})
            
            # Retornar apology se e-mail já está cadastrado
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
            hash = generate_password_hash(password, method='pbkdf2', salt_length=16) # Gerar versão criptografada da senha
            query = '''
            INSERT INTO users (username, hash, email) VALUES ((%s), (%s), (%s))
            '''
            values = (username, hash, email)
            cursor.execute(query, values)
            conn.commit()

            # Redirecionar para login
            return jsonify({"success": True, "message": "Cadastro realizado com sucesso"})
        
    except psycopg2.OperationalError as e:
        print("Erro na requisição /signup:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor (SSL)"}), 500
    
    except Exception as e:
        print("Erro na requisição /signup:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor"}), 500
    
    finally:
        if conn:
            conn.close()


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

    # Conectar com banco de dados
    conn = None
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"success": False, "message": "Erro ao conectar ao banco de dados"}), 500
        with conn.cursor() as cursor:
            # Consultar tabela users por username
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
        
    except psycopg2.OperationalError as e:
        print("Erro na requisição /login:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor (SSL)"}), 500
    
    except Exception as e:
        print("Erro na requisição /login:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor"}), 500
    
    finally:
        if conn:
            conn.close()


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
    
    # Conectar com banco de dados
    conn = None
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"success": False, "message": "Erro ao conectar ao banco de dados"}), 500
        with conn.cursor() as cursor:
            # Consultar tabela users pelo email do usuário
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
            reset_link = f"{backend_url}/reset_password/{token}" # link para front-end
            msg = Message('Redefinir sua senha', recipients=[email]) # título
            msg.body = f'Clique no link para redefinir sua senha: {reset_link}' # corpo da mensagem
            mail.send(msg)
            return jsonify({"success": True, "message": "Um link para redefinição de senha foi enviado para o seu e-mail.\nCaso não encontre, verifique sua caixa de spam"})
        
    except psycopg2.OperationalError as e:
        print("Erro na requisição /forgot/password:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor (SSL)"}), 500
    
    except Exception as e:
        print("Erro na requisição /forgot/password:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor"}), 500
    
    finally:
        if conn:
            conn.close()
        

## Redefinir senha
@app.route('/reset_password/<token>', methods=["POST"])
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

    # Conectar com banco de dados
    conn = None
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"success": False, "message": "Erro ao conectar ao banco de dados"}), 500
        with conn.cursor() as cursor:
            # Atualizar registro existente
            query = '''
            UPDATE users SET hash = (%s) WHERE email = (%s)              
            '''
            values = (hash, email)
            cursor.execute(query, values)
            conn.commit()
            return jsonify({"success": True, "message": "Senha redefinida com sucesso."})
        
    except psycopg2.OperationalError as e:
        print("Erro na requisição /reset_password:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor (SSL)"}), 500
    
    except Exception as e:
        print("Erro na requisição /reset_password:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor"}), 500
    
    finally:
        if conn:
            conn.close()

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

    # Conectar com banco de dados
    conn = None
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"success": False, "message": "Erro ao conectar ao banco de dados"}), 500

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
            login_link = f"{backend_url}/login" # link para login
            msg = Message('Seu nome de usuário', recipients=[email]) # título
            msg.body = f'Seu nome de usuário é: {usr}\n\nIr pra página de login: {login_link}' # corpo da mensagem
            mail.send(msg)
            return jsonify({"success": True, "message": "O nome de usuário foi enviado para o seu e-mail.\nCaso não encontre, verifique sua caixa de spam"})

    except psycopg2.OperationalError as e:
        print("Erro na requisição /forgot/username:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor (SSL)"}), 500
        
    except Exception as e:
        print("Erro na requisição /forgot/username:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor"}), 500
    
    finally:
        if conn:
            conn.close()


## Página "Vacas"
@app.route("/vacas", methods=["GET", "POST"])
@login_required
def vacas():

    # Escolher período
    if request.method == "POST":
        return jsonify({"success": False, "message": "Período não fornecido"}), 400
    
    # Renderizar tabela
    else:
        # Conectar com banco de dados
        conn = None
        try:
            conn = get_db_connection()
            if not conn:
                return jsonify({"success": False, "message": "Erro ao conectar ao banco de dados"}), 500
            with conn.cursor() as cursor:
                query = sql.SQL('''
                    SELECT * FROM {}
                ''').format(sql.Identifier(session["vacas"]))
                cursor.execute(query)
                vacas = cursor.fetchall()
                colunas = [desc[0] for desc in cursor.description]  # Nomes das colunas
                return json.dumps({"success": True, "colunas": colunas, "vacas": vacas}, default=str)

        except psycopg2.OperationalError as e:
            print("Erro na requisição /vacas:", str(e))
            traceback.print_exc()  # Exibe o erro completo nos logs do Render
            return jsonify({"success": False, "message": "Erro no servidor (SSL)"}), 500
        
        except Exception as e:
            print("Erro na requisição /vacas:", str(e))
            traceback.print_exc()  # Exibe o erro completo nos logs do Render
            return jsonify({"success": False, "message": "Erro no servidor"}), 500
        
        finally:
            if conn:
                conn.close()

    

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

    # Conectar com banco de dados
    conn = None
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"success": False, "message": "Erro ao conectar ao banco de dados"}), 500
        with conn.cursor() as cursor:
            # Inserir nova vaca na tabela vacas
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
        
    except psycopg2.OperationalError as e:
        print("Erro na requisição /cadastro:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor (SSL)"}), 500
    
    except Exception as e:
        print("Erro na requisição /cadastro:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor"}), 500
    
    finally:
        if conn:
            conn.close()


## Diário de cada vaca
@app.route("/diario", methods=["POST"])
@login_required
def diario():

    # Recuperar dados inputados
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400

    seletor = request.json.get("seletor")

    if not seletor:
        return jsonify({"success": False, "message": "ID não fornecido"}), 400

    # Conectar com banco de dados
    conn = None
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"success": False, "message": "Erro ao conectar ao banco de dados"}), 500
        with conn.cursor() as cursor:
            # Verificar se ID é válido
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
    
    except psycopg2.OperationalError as e:
        print("Erro na requisição /diario:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor (SSL)"}), 500
    
    except Exception as e:
        print("Erro na requisição /diario:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor"}), 500
    
    finally:
        if conn:
            conn.close()
        

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

    # Conectar com banco de dados
    conn = None
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"success": False, "message": "Erro ao conectar ao banco de dados"}), 500
        with conn.cursor() as cursor:
            # Verificar se id é válido
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
            return json.dumps({"success": True, "colunas": colunas, "dias": dias}, default=str)
        
    except psycopg2.OperationalError as e:
        print("Erro na requisição /registro:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor (SSL)"}), 500
    
    except Exception as e:
        print("Erro na requisição /registro:", str(e))
        traceback.print_exc()  # Exibe o erro completo nos logs do Render
        return jsonify({"success": False, "message": "Erro no servidor"}), 500
    
    finally:
        if conn:
            conn.close()


## Página de relatórios
@app.route("/relatorios", methods = ["POST"])
def relatorios():
    print("=== Relatórios Route Called ===")
    print("Request Data:", request.get_json())

    # Recuperar dados inputados
    data = request.get_json()

    if not data:
        print("No data received")
        return jsonify({"success": False, "message": "Dados não recebidos"}), 400
    
    option = data.get("option")
    select = data.get("select")

    print(f"Option: {option}, Select: {select}")

    if not option:
        print("No option selected")
        return jsonify({"success": False, "message": "Escolha uma opção"}), 400

    # Analisar relatórios de uma vaca
    if option == "select":
        if not select:
            return jsonify({"success": False, "message": "Nenhum ID inserido"}), 400

        # Conectar com banco de dados
        conn = None
        try:
            conn = get_db_connection()
            if not conn:
                return jsonify({"success": False, "message": "Erro ao conectar ao banco de dados"}), 500
            with conn.cursor() as cursor:
                # Verificar se id é válido
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
                df = df.fillna(0)

                ## Descriptive analytics - statistics
                descriptive = df.describe()
                descriptive = descriptive.round(2)
                count = descriptive.iloc[0,1]
                descriptive.drop('count', inplace=True)

                # Verificar se tabela SQL já existe
                descrip_format = f'descriptive_vaca{id}_{session["username"]}'

                # Criar tabela SQL, caso tabela não exista, ou substituir existente
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

                    # Definindo comprimento das classes
                    max_value = df[column].max()
                    min_value = df[column].min()

                    # verificar se coluna é numérica ou categórica
                    if isinstance(min_value, (int, float)):
                        bins = 5
                        max_value = round(float(max_value), 2)
                        min_value = round(float(min_value), 2)
                        width = round((max_value - min_value) / bins, 2)

                        # Criando as classes por comprimento de intervalo
                        classes = list()
                        freq = [0] * bins
                        start = min_value
                        for i in range(bins):
                            stop = round(start + width, 2)
                            classes.append((start, stop))
                            start = round(stop, 2)

                        # Os breakpoints das classes
                        bkps = [c[0] for c in classes] + [classes[-1][1]]
                        
                        # Remove duplicate bin edges
                        bkps = sorted(set(bkps))
                        
                        # Rótulos formatados com 1 casa decimal
                        labels = [f"({round(bkps[i], 1)}, {round(bkps[i+1], 1)}]" for i in range(len(bkps)-1)]

                        # Criação da base com todas as classes
                        df_base = pd.DataFrame({'classe': labels, 'frequência': [0] * len(labels)})

                        # regex para formatação
                        df_base['classe'] = df_base['classe'].astype(str)
                        df_base['classe'] = df_base['classe'].str.replace(r'\,', ' -', regex=True)
                        df_base['classe'] = df_base['classe'].str.replace(r'[\(\]]', '', regex=True)

                        # Aplicar no pd.cut
                        df['classe'] = pd.cut(df[column], bins=bkps, labels=labels, right=True, include_lowest=True, ordered=False)

                        # Frequência real dos dados
                        df_freq = df.groupby('classe', observed=True).size().reset_index(name='frequência')
                        
                        # regex para formatação
                        df_freq['classe'] = df_freq['classe'].astype(str)
                        df_freq['classe'] = df_freq['classe'].str.replace(r'\,', ' -', regex=True)
                        df_freq['classe'] = df_freq['classe'].str.replace(r'[\(\]]', '', regex=True)

                        # Merge: a base com todas as classes à esquerda
                        df_final = pd.merge(df_base, df_freq, on='classe', how='left', suffixes=('_base', ''))

                        # Substitui NaN por 0 (onde não houve ocorrências)
                        df_final['frequência'] = df_final['frequência'].fillna(0).astype(int)
                        df_final.drop('frequência_base', axis=1, inplace=True)

                        # Intervalos
                        intervals = bkps

                        # Densidade de frequência e porcentagem
                        freq = list(df_final['frequência'])
                        n = len(df[column])
                        
                        # Check if all values are the same
                        if len(set(df[column])) == 1:
                            # Create a single bar with 100% frequency
                            value = df[column].iloc[0]
                            plt.figure(figsize=(10, 6))
                            plt.bar([str(round(value, 2))], [100], width=0.5, color='#1051AB', alpha=0.9, edgecolor='black')
                            plt.title(column)
                            plt.xlabel(column)
                            plt.ylabel('Densidade de Frequência')
                            plt.ylim(0, 110)  # Add some padding above 100%
                            
                            # Save the plot
                            img_io = io.BytesIO()
                            plt.savefig(img_io, format='png', bbox_inches='tight')
                            img_io.seek(0)

                            # Converter para base64
                            img_data = base64.b64encode(img_io.getvalue()).decode('utf-8')
                            img_paths.append(f"data:image/png;base64,{img_data}")

                            plt.close()
                            continue
                        
                        densidade = [round(f / (n*(intervals[i + 1] - intervals[i])), 4) for i, f in enumerate(freq)]
                        porc = [round(f/n*100, 2) for f in freq]

                        # Skip plotting if no data
                        if not densidade or max(densidade) == 0:
                            print(f"No data to plot for column {column}")
                            plt.close()
                            continue

                        # representação em valores contínuos
                        plt.bar(intervals[:-1], densidade, align='edge',
                                width=[intervals[i+1] - intervals[i] for i in range(len(intervals) - 1)],
                                color='#1051AB', alpha=0.9, edgecolor='black')
                        plt.xlabel(column)
                        plt.ylabel('Densidade de Frequência')
                        plt.title(column)
                        plt.xticks(intervals)
                        plt.ylim(0, max(densidade) + 0.1*max(densidade))
                        plt.xlim(min_value - width, intervals[-1] + width)
                        for i, p in enumerate(porc):
                            plt.text(intervals[i] + width/2, densidade[i] + 0.02*densidade[i], f'{round(p)}%', ha='center', fontsize=10)

                        # Salvar a imagem em memória com BytesIO
                        img_io = io.BytesIO()
                        plt.savefig(img_io, format='png', bbox_inches='tight')
                        img_io.seek(0)  # Voltar para o início do arquivo

                        # Converter para base64 para poder renderizar na página HTML
                        img_data = base64.b64encode(img_io.getvalue()).decode('utf-8')
                        img_paths.append(f"data:image/png;base64,{img_data}")

                        plt.close()  # Fechar o gráfico

                    else:
                        print(f"Processing categorical column: {column}")
                        # Garantir que a coluna está tratada como string e sem valores ausentes
                        # Standardize categorical values: strip whitespace, convert to lowercase
                        df[column] = df[column].astype(str).str.strip().str.lower().fillna("desconhecido")
                        
                        # Ordenar categorias por frequência e remover duplicatas
                        value_counts = df[column].value_counts()
                        ordem = value_counts.index

                        # Plotagem com barras categóricas
                        plt.figure(figsize=(10, 6))
                        sns.countplot(data=df, x=column, order=ordem, color='#1051AB', edgecolor='black')
                        plt.title(column)
                        plt.xlabel(column)
                        plt.ylabel('Frequência')
                        plt.xticks(rotation=45)
                        plt.tight_layout()

                        # Salvar a imagem em memória com BytesIO
                        img_io = io.BytesIO()
                        plt.savefig(img_io, format='png', bbox_inches='tight')
                        img_io.seek(0)

                        # Converter para base64
                        img_data = base64.b64encode(img_io.getvalue()).decode('utf-8')
                        img_paths.append(f"data:image/png;base64,{img_data}")

                        plt.close()
                # Armazenar os gráficos na sessão
                session['img_paths'] = img_paths
                message = f'Vaca {select}'
                return jsonify({
                        "success": True,
                        "colunas": colunas,
                        "linhas": linhas,
                        "count": count,
                        "img_paths": session["img_paths"],
                        "message": message
                    })
        except psycopg2.OperationalError as e:
            print("Erro na requisição /relatorios:", str(e))
            traceback.print_exc()  # Exibe o erro completo nos logs do Render
            return jsonify({"success": False, "message": "Erro no servidor (SSL)"}), 500
        
        except Exception as e:
            print("Erro na requisição /relatorios:", str(e))
            traceback.print_exc()  # Exibe o erro completo nos logs do Render
            return jsonify({"success": False, "message": "Erro no servidor"}), 500
        
        finally:
            if conn:
                conn.close()
        
    elif option == "all":
        ## Conectar com banco de dados
        conn = None
        try:
            print("Starting 'all' reports generation...")
            conn = get_db_connection()
            if not conn:
                print("Failed to connect to database")
                return jsonify({"success": False, "message": "Erro ao conectar ao banco de dados"}), 500
            with conn.cursor() as cursor:
                all_descriptives = []
                all_data = []  # List to store all data for visualization

                # Averiguar ids das vacas cadastradas
                print("Fetching cow IDs...")
                query = sql.SQL('''
                    SELECT id FROM {}
                ''').format(sql.Identifier(session["vacas"]))
                cursor.execute(query)
                ids = cursor.fetchall()
                if not ids:
                    print("No cows found in database")
                    return jsonify({"success": False, "message": "Nenhuma vaca cadastrada"})
                
                print(f"Found {len(ids)} cows")
                
                # Averiguar quais ids cadastrados possuem registros no diário
                for id_tuple in ids:
                    id = id_tuple[0]
                    table_name = f'vaca{id}_{session["username"]}'
                    print(f"Checking table {table_name}...")
                    # Verificar se tabela de registros existe
                    query = sql.SQL('''
                    SELECT EXISTS (
                        SELECT 1 
                        FROM information_schema.tables 
                        WHERE table_schema = 'public'
                        AND table_name = {}
                    )
                    ''').format(sql.Literal(table_name))
                    cursor.execute(query)
                    result = cursor.fetchall()

                    if result[0][0]:
                        print(f"Table {table_name} exists, fetching data...")
                        # Converter para DataFrame
                        query = sql.SQL('''
                        SELECT * FROM {}
                        ''').format(sql.Identifier(table_name))
                        as_str = query.as_string(conn)
                        df = pd.read_sql_query(as_str, engine)
                        # Verificar se DataFrame não está vazio
                        if df.empty:
                            print(f"Table {table_name} is empty, skipping...")
                            continue
                        print(f"Found {len(df)} records in {table_name}")
                        # Missing values
                        df = df.fillna(0)
                        all_data.append(df)  # Store the data for visualization

                        ## Descriptive analytics - statistics
                        descriptive = df.describe()
                        descriptive = descriptive.round(2)
                        count = descriptive.iloc[0,1]
                        descriptive.drop('count', inplace=True)
                        all_descriptives.append(descriptive)

                        # Verificar se tabela SQL já existe
                        descrip_format = f'descriptive_vaca{id}_{session["username"]}'

                        # Criar tabela SQL, caso tabela não exista, ou substituir existente
                        descriptive.to_sql(descrip_format, con=engine, index=True, index_label="parâmetro", if_exists='replace')
                        
                # Tira a média de todas as tabelas
                if not all_descriptives:
                    print("No descriptive statistics found for any cow")
                    return jsonify({"success": False, "message": "Nenhuma vaca possui registros"}), 400
                
                print("Combining data from all cows...")
                # Combine all data for visualization
                combined_df = pd.concat(all_data, ignore_index=True)
                
                # Calculate descriptive statistics on the combined data
                grouped = combined_df.describe().round(2)
                grouped = grouped.drop('count')
                
                # Reorder rows to match individual cow tables
                row_order = ['mean', 'std', 'min', '25%', '50%', '75%', 'max']
                grouped = grouped.reindex(row_order)

                # Salva como tabela descritiva geral
                descrip_all = f'descriptive_all_{session["username"]}'
                grouped.to_sql(descrip_all, con=engine, index=True, index_label='parâmetro', if_exists='replace')

                # Retornar consulta na tabela
                query_descrip = sql.SQL('''
                SELECT * FROM {}
                ''').format(sql.Identifier(descrip_all))
                cursor.execute(query_descrip)
                linhas = cursor.fetchall()
                colunas = [desc[0] for desc in cursor.description]

                print("Generating visualizations...")
                ## Descriptive analytics - univariate visualization
                img_paths = []
                for column in combined_df.columns[1:]:
                    try:
                        plt.figure(figsize=(10, 6))

                        # verificar se coluna é numérica ou categórica
                        if isinstance(combined_df[column].iloc[0], (int, float)):
                            print(f"Processing numerical column: {column}")
                            bins = 5
                            max_value = round(float(combined_df[column].max()), 2)
                            min_value = round(float(combined_df[column].min()), 2)
                            width = round((max_value - min_value) / bins, 2)

                            # Criando as classes por comprimento de intervalo
                            classes = list()
                            freq = [0] * bins
                            start = min_value
                            for i in range(bins):
                                stop = round(start + width, 2)
                                classes.append((start, stop))
                                start = round(stop, 2)

                            # Os breakpoints das classes
                            bkps = [c[0] for c in classes] + [classes[-1][1]]
                            
                            # Remove duplicate bin edges
                            bkps = sorted(set(bkps))
                            
                            # Rótulos formatados com 1 casa decimal
                            labels = [f"({round(bkps[i], 1)}, {round(bkps[i+1], 1)}]" for i in range(len(bkps)-1)]

                            # Criação da base com todas as classes
                            df_base = pd.DataFrame({'classe': labels, 'frequência': [0] * len(labels)})

                            # regex para formatação
                            df_base['classe'] = df_base['classe'].astype(str)
                            df_base['classe'] = df_base['classe'].str.replace(r'\,', ' -', regex=True)
                            df_base['classe'] = df_base['classe'].str.replace(r'[\(\]]', '', regex=True)

                            # Aplicar no pd.cut
                            combined_df['classe'] = pd.cut(combined_df[column], bins=bkps, labels=labels, right=True, include_lowest=True, ordered=False)

                            # Frequência real dos dados
                            df_freq = combined_df.groupby('classe', observed=True).size().reset_index(name='frequência')
                            
                            # regex para formatação
                            df_freq['classe'] = df_freq['classe'].astype(str)
                            df_freq['classe'] = df_freq['classe'].str.replace(r'\,', ' -', regex=True)
                            df_freq['classe'] = df_freq['classe'].str.replace(r'[\(\]]', '', regex=True)

                            # Merge: a base com todas as classes à esquerda
                            df_final = pd.merge(df_base, df_freq, on='classe', how='left', suffixes=('_base', ''))

                            # Substitui NaN por 0 (onde não houve ocorrências)
                            df_final['frequência'] = df_final['frequência'].fillna(0).astype(int)
                            df_final.drop('frequência_base', axis=1, inplace=True)

                            # Intervalos
                            intervals = bkps

                            # Densidade de frequência e porcentagem
                            freq = list(df_final['frequência'])
                            n = len(combined_df[column])
                            
                            # Check if all values are the same
                            if len(set(combined_df[column])) == 1:
                                # Create a single bar with 100% frequency
                                value = combined_df[column].iloc[0]
                                plt.figure(figsize=(10, 6))
                                plt.bar([str(round(value, 2))], [100], width=0.5, color='#1051AB', alpha=0.9, edgecolor='black')
                                plt.title(f'Média de {column} - Todas as Vacas')
                                plt.xlabel(column)
                                plt.ylabel('Densidade de Frequência')
                                plt.ylim(0, 110)  # Add some padding above 100%
                                
                                # Save the plot to memory
                                img_io = io.BytesIO()
                                plt.savefig(img_io, format='png', bbox_inches='tight')
                                img_io.seek(0)

                                # Convert to base64
                                img_data = base64.b64encode(img_io.getvalue()).decode('utf-8')
                                img_paths.append(f"data:image/png;base64,{img_data}")
                                plt.close()
                                continue
                            
                            densidade = [round(f / (n*(intervals[i + 1] - intervals[i])), 4) for i, f in enumerate(freq)]
                            porc = [round(f/n*100, 2) for f in freq]

                            # Skip plotting if no data
                            if not densidade or max(densidade) == 0:
                                print(f"No data to plot for column {column}")
                                plt.close()
                                continue

                            # representação em valores contínuos
                            plt.bar(intervals[:-1], densidade, align='edge',
                                    width=[intervals[i+1] - intervals[i] for i in range(len(intervals) - 1)],
                                    color='#1051AB', alpha=0.9, edgecolor='black')
                            plt.xlabel(column)
                            plt.ylabel('Densidade de Frequência')
                            plt.title(f'Média de {column} - Todas as Vacas')
                            plt.xticks(intervals)
                            plt.ylim(0, max(densidade) + 0.1*max(densidade))
                            plt.xlim(min_value - width, intervals[-1] + width)
                            for i, p in enumerate(porc):
                                plt.text(intervals[i] + width/2, densidade[i] + 0.02*densidade[i], f'{round(p)}%', ha='center', fontsize=10)

                            # Save the plot to memory
                            img_io = io.BytesIO()
                            plt.savefig(img_io, format='png', bbox_inches='tight')
                            img_io.seek(0)

                            # Convert to base64
                            img_data = base64.b64encode(img_io.getvalue()).decode('utf-8')
                            img_paths.append(f"data:image/png;base64,{img_data}")
                            plt.close()

                        else:
                            print(f"Processing categorical column: {column}")
                            # Garantir que a coluna está tratada como string e sem valores ausentes
                            # Standardize categorical values: strip whitespace, convert to lowercase
                            combined_df[column] = combined_df[column].astype(str).str.strip().str.lower().fillna("desconhecido")
                            
                            # Ordenar categorias por frequência e remover duplicatas
                            value_counts = combined_df[column].value_counts()
                            ordem = value_counts.index

                            # Plotagem com barras categóricas
                            plt.figure(figsize=(10, 6))
                            sns.countplot(data=combined_df, x=column, order=ordem, color='#1051AB', edgecolor='black')
                            plt.title(f'Distribuição de {column} - Todas as Vacas')
                            plt.xlabel(column)
                            plt.ylabel('Frequência')
                            plt.xticks(rotation=45)
                            plt.tight_layout()

                            # Salvar a imagem em memória com BytesIO
                            img_io = io.BytesIO()
                            plt.savefig(img_io, format='png', bbox_inches='tight')
                            img_io.seek(0)

                            # Converter para base64
                            img_data = base64.b64encode(img_io.getvalue()).decode('utf-8')
                            img_paths.append(f"data:image/png;base64,{img_data}")

                            plt.close()
                    except Exception as e:
                        print(f"Error processing column {column}: {str(e)}")
                        traceback.print_exc()
                        continue

                print(f"Generated {len(img_paths)} visualizations")
                # Armazenar os gráficos na sessão
                session['img_paths'] = img_paths
                message = 'Média de todas as vacas'
                return jsonify({
                        "success": True,
                        "colunas": colunas,
                        "linhas": linhas,
                        "count": len(combined_df),
                        "img_paths": session["img_paths"],
                        "message": message
                    })
        except psycopg2.OperationalError as e:
            print("Erro na requisição /relatorios (OperationalError):", str(e))
            traceback.print_exc()  # Exibe o erro completo nos logs do Render
            return jsonify({"success": False, "message": "Erro no servidor (SSL)"}), 500
        
        except Exception as e:
            print("Erro na requisição /relatorios (General Error):", str(e))
            traceback.print_exc()  # Exibe o erro completo nos logs do Render
            return jsonify({"success": False, "message": "Erro no servidor"}), 500
        
        finally:
            if conn:
                conn.close()

###############################################################################3

if __name__ == '__main__':
    app.run(debug=True)