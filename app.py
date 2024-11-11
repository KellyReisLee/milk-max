## BIBLIOTECAS ##

import os
from dotenv import load_dotenv

from flask import Flask, render_template, redirect, session, request
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

from helpers import apology, login_required

############################################################################

## CONFIGURAÇÕES ##

# Configure app
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')

# Configurar sessão para que armazenamento de dados seja feito no servidor, e não através de cookies (navegador)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Carrega as variáveis do arquivo .env
load_dotenv()
db_host = os.getenv("DB_HOST")
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    dbname=db_name,
    user=db_user,
    password=db_password,
    host=db_host,
    port='5432'
)

# SQLAlchemy
url = f'postgresql://{db_user}:{db_password}@{db_host}:5432/{db_name}'
engine = create_engine(url)

# Create cursor
cursor = conn.cursor()

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

## Index/home
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

## Register page
@app.route("/signup", methods=["GET", "POST"])
def signup():

    # Formulário de registro submetido
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirm = request.form.get("confirm")

        # Retornar apology se nome de usuário ou senha não existem
        if not username:
            return apology("Inserir nome de usuário")   
        elif not password:
            return apology("Inserir senha")

        # Retornar apology se nome de usuário já existe
        query_register = '''
        SELECT * FROM users WHERE username = (%s)
        '''
        cursor.execute(query_register, (username,))
        usr = cursor.fetchall()
        if len(usr) != 0:
            return apology("Nome de usuário já existe")
        
        # Retornar apology se senhas não coincidem
        if password != confirm:
            return apology("Senhas não coincidem")
        
        # Inserir novo usuário na tabela users
        hash = generate_password_hash(password, method='pbkdf2', salt_length=16) # Gerar versão criptografada da senha
        query = '''
        INSERT INTO users (username, hash) VALUES ((%s), (%s))
        '''
        values = (username, hash)
        cursor.execute(query, values)
        conn.commit()
        return redirect("/login")

    # Renderizar formulário de registro
    else:
        return render_template("signup.html")


## Sair da sessão
@app.route("/logout")
def logout():

    session.clear()
    return redirect("/")


## Login page
@app.route("/login", methods=["POST", "GET"])
def login():

    # Sair de qualquer sessão aberta
    session.clear()

    # Recuperar dados do login
    if request.method == "POST":

        # Garantir que username existe
        if not request.form.get("username"):
            return apology("Inserir nome de usuário")

        # Garantir que senha existe
        elif not request.form.get("password"):
            return apology("Inserir senha")

        # Consultar tabela users por username
        query = '''
        SELECT * FROM users WHERE username = (%s)
        '''
        value = request.form.get("username")
        cursor.execute(query, (value,))
        rows = cursor.fetchall()

        # Garantir que username existe e senha está correta
        if len(rows) != 1 or not check_password_hash(
            rows[0][2], request.form.get("password")
        ):
            return apology("Nome de usuário e/ou senha inválido")

        # Criar sessão de usuário logado, armazenando como "key" seu username
        session["username"] = rows[0][1]

        # Criar tabela de vacas se não existe
        tabela_vacas = f'vacas_{session["username"]}'
        session["vacas"] = tabela_vacas # guardar nome da tabela na sessão do usuário
        create_query = sql.SQL('''
        CREATE TABLE IF NOT EXISTS {} (id SERIAL PRIMARY KEY, raca VARCHAR(50), nasc DATE, peso FLOAT);
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

        # Redirecionar para homepage
        return redirect("/vacas")

    # Renderizar formulário de login
    else:
        return render_template("login.html")

## Página "Vacas"
@app.route("/vacas", methods=["GET", "POST"])
@login_required
def vacas():

    # Adicionar atributo
    if request.method == "POST":
        return redirect("/vacas")
    
    # Renderizar tabela
    else:
        query = sql.SQL('''
        SELECT * FROM {}             
        ''').format(sql.Identifier(session["vacas"]))
        cursor.execute(query)
        vacas = cursor.fetchall()
        colunas = [desc[0] for desc in cursor.description]  # Nomes das colunas
        return render_template("vacas.html", colunas=colunas, vacas=vacas)
    

## Cadastro de nova vaca
@app.route("/cadastro", methods = ["POST"])
@login_required
def cadastro():

    # Recuper dados inputados
    raca = request.form.get("raca")
    nasc = request.form.get("nasc")
    peso = request.form.get("peso")

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
    return redirect("/vacas")


## Diário de cada vaca
@app.route("/diario", methods=["POST", "GET"])
@login_required
def diario():

    # Selecionar vaca
    if request.method == "POST":

        # Verificar se ID é válido
        seletor = int(request.form.get("selecao_vaca"))
        tab = f'vaca{seletor}_{session["username"]}'
        id_query = sql.SQL('''
        SELECT * FROM {} WHERE id = (%s)
        ''').format(sql.Identifier(session["vacas"]))
        cursor.execute(id_query, (seletor,))
        result = (cursor.fetchall())
        if not result:
            return apology("ID inválido")
        
        # Renderizar tabela
        query = sql.SQL('''
        SELECT * FROM {} ORDER BY dia       
        ''').format(sql.Identifier(tab))
        cursor.execute(query)
        dias = cursor.fetchall()
        colunas = [desc[0] for desc in cursor.description]
        return render_template("diario.html", colunas=colunas, dias=dias)
        
    # Renderizar tabela
    else:
        colunas = []
        dias = []
        return render_template("diario.html", colunas=colunas, dias=dias)

## Registro no diário
@app.route("/registro", methods = ["POST"])
@login_required
def registro():

    # Recuper dados inputados
    id = int(request.form.get("id_vaca"))
    dia = request.form.get("dia")
    ciclo = request.form.get("ciclo")
    qtdd = request.form.get("leite_qtdd")
    temp = request.form.get("leite_temp")
    ph = request.form.get("leite_ph")

    # Verificar se id é válido
    tab = f'vaca{id}_{session["username"]}'
    id_query = sql.SQL('''
    SELECT * FROM {} WHERE id = (%s)
    ''').format(sql.Identifier(session["vacas"]))
    cursor.execute(id_query, (id,))
    result = (cursor.fetchall())
    if not result:
        return apology("ID inválido")
    
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
    return render_template("diario.html", colunas=colunas, dias=dias)


## Página de relatórios
@app.route("/relatorios", methods = ["GET", "POST"])
def relatorios():
    if request.method == "POST":
        option = request.form.get("select")

        ## Analisar relatórios de uma vaca
        if option != "all":
            select = request.form.get("selecao_vaca")
            if select == "":
                return apology("Nenhum ID selecionado")

            # Verificar se id é válido
            id = int(select)
            tab = f'vaca{id}_{session["username"]}'
            id_query = sql.SQL('''
            SELECT * FROM {} WHERE id = (%s)
            ''').format(sql.Identifier(session["vacas"]))
            cursor.execute(id_query, (id,))
            result = (cursor.fetchall())
            if not result:
                return apology("ID inválido")
            
            # Converter para DataFrame
            query = sql.SQL('''
            SELECT * FROM {}
            ''').format(sql.Identifier(tab))
            cursor.execute(query)
            result = cursor.fetchall()
            if not result:
                return apology("Não há nenhum registro no diário dessa vaca")
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
            len = df.shape[1]
            columns = []
            for i in range(len):
                columns.append(df.columns[i])
            for column in columns[1:]:
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
            return render_template("relatorios.html", colunas=colunas, linhas=linhas, count=count, img_paths=session["img_paths"])
    else:
        return render_template("relatorios.html")

###############################################################################3

if __name__=='__main__':
    app.run(debug=True)