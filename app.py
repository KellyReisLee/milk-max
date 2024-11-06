## BIBLIOTECAS ##

import os

from flask import Flask, render_template, redirect, session, request
import psycopg2
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required

############################################################################

## CONFIGURAÇÕES ##

# Configure app
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    dbname='milkmax',
    user='postgres',
    password='my627267',
    host='localhost',
    port='5432'
)

# Create cursor
cursor = conn.cursor()

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


## Register page
@app.route("/register", methods=["GET", "POST"])
def register():

    # Formulário de registro submetido
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirm = request.form.get("confirm")

        # Retornar apology se nome de usuário já existe
        cursor.execute("SELECT * FROM users WHERE username = (%s)", username)
        usr = cursor.fetchall()
        if len(usr) != 0:
            return apology("Nome de usuário já existe")
        
        # Retornar apology se senhas não coincidem
        if password != confirm:
            return apology("passwords don't match")

        # Inserir novo usuário na tabela users
        hash = generate_password_hash(password, method='pbkdf2', salt_length=16) # Gerar versão criptografada da senha
        query = '''
        INSERT INTO users (username, hash) VALUES (%s), (%s)
        '''
        values = (username, hash)
        cursor.execute(query, values)
        conn.commit()
        return redirect("/login")

    # Renderizar formulário de registro
    else:
        return render_template("register.html")


## Sair da sessão
@app.route("/logout")
def logout():

    # Encerrar sessão
    session.clear()
    return redirect("/")


## Login page
@app.route("/login", methods=["POST", "GET"])
def login():

    # Sair de qualquer sessão aberta
    session.clear()

    # Recuperar dados do login
    if request.method == "POST":

        # Consultar tabela users por username
        query = '''
        SELECT * FROM users WHERE username = (%s)
        '''
        value = (request.form.get("username"))
        cursor.execute(query, value)
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
        create_query = '''
        CREATE TABLE IF NOT EXISTS (%s) (id SERIAL PRIMARY KEY, raca VARCHAR(50), nasc DATE, peso FLOAT);
        '''
        cursor.execute(create_query, session["vacas"])
        conn.commit()

        # Guardar número de vacas na sessão do usuário
        cursor.execute('''SELECT COUNT(*) FROM (%s)''', session["vacas"])
        num_vacas = cursor.fetchall()
        session["num_vacas"] = num_vacas

        # Redirecionar para homepage
        return redirect("/")

    # Renderizar formulário de login
    else:
        return render_template("login.html")

## Página "Vacas"
@app.route("/vacas", methods=["GET", "POST"])
@login_required
def vacas():
#**********************************************************************
    # Adicionar atributo
    if request.method == "POST":
        return redirect("/vacas")
    
    # Renderizar tabela
    else:
        cursor.execute("SELECT * FROM (%s)", session["vacas"])
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
    nova_vaca = '''
    INSERT INTO (%s) (raca, nasc, peso) VALUES ((%s), (%s), (%s))
    '''
    nova_vaca_values = (session["vacas"], raca, nasc, peso)
    cursor.execute(nova_vaca, nova_vaca_values)
    conn.commit()

    # Criar tabela para nova vaca
    session["num_vacas"] = session["num_vacas"] + 1
    nova_tab = f'vaca{session["num_vacas"]}_{session["username"]}'
    create_table = '''
    CREATE TABLE (%s) (dia INTEGER, consumo_alimento FLOAT, leite_quantidade FLOAT, leite_temperatura FLOAT, leite_ph FLOAT, )
    '''
    cursor.execute(create_table, nova_tab)
    conn.commit()
    return redirect("/vacas")


## Diário de cada vaca
@app.route("/diario", methods=["POST", "GET"])
@login_required
def diario():

    # Selecionar vaca
    if request.method == "POST":
        seletor = request.form.get("selecao_vaca")
        if seletor < 1 or seletor > session["num_vacas"]:
            return apology("ID inválido")
        tab = f'vaca{seletor}_{session["username"]}'
        cursor.execute("SELECT * FROM (%s)", tab)
        dias = cursor.fetchall()
        colunas = [desc[0] for desc in cursor.description]
        return render_template("diario.html", colunas=colunas, dias=dias)
        
    # Renderizar tabela
    else:
        default = 'vaca' + '1'
        default = f'{default}_{session["username"]}'
        cursor.execute("SELECT * FROM (%s)", default)
        cursor.fetchall()
        dias = []
        colunas = [desc[0] for desc in cursor.description]  # Nomes das colunas
        return render_template("diario.html", colunas=colunas, dias=dias)


@app.route("/relatorios")
def relatorios():
    return render_template("relatorios.html")

###############################################################################3

if __name__=='__main__':
    app.run(debug=True)