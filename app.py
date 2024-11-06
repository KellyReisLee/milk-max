from flask import Flask, render_template, redirect, session, request
import psycopg2
from psycopg2.extras import RealDictCursor
from dataclasses import dataclass
import os

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


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/relatorios")
def relatorios():
    return render_template("relatorios.html")


@app.route("/vacas", methods=["GET", "POST"])
def vacas():
    if request.method == "POST":
        return redirect("/vacas")
    else:
        cursor.execute("SELECT * FROM vacas")
        vacas = cursor.fetchall()
        colunas = [desc[0] for desc in cursor.description]  # Nomes das colunas
        return render_template("vacas.html", colunas=colunas, vacas=vacas)


@app.route("/diario", methods=["POST", "GET"])
def diario():
    if request.method == "POST":
        seletor = request.form.get("selecao_vaca")
        if seletor in VACAS:
            cursor.execute('''SELECT * FROM (%s)''', seletor)
            dias = cursor.fetchall()
            colunas = [desc[0] for desc in cursor.description]
            return render_template("diario.html", colunas=colunas, dias=dias)
    else:
        return render_template("diario.html")


@app.route("/cadastro", methods = ["POST"])
def cadastro():
    # Recuperando dados inputados
    raca = request.form.get("raca")
    nasc = request.form.get("nasc")
    peso = request.form.get("peso")

    # Inserindo nova vaca na tabela vacas
    new_cow = '''
    INSERT INTO vacas (raca, nasc, peso) VALUES ((%s), (%s), (%s))
    '''
    new_cow_values = (raca, nasc, peso)
    cursor.execute(new_cow, new_cow_values)
    conn.commit()
    return redirect("/vacas")

    # Criar tabela para nova vaca
    #cursor.execute('''SELECT COUNT(*) FROM vacas''')
    #num_vacas = cursor.fetchall()
    #posicao = num_vacas + 1
    

   # create_table = '''
   # CREATE TABLE vaca(%s) (dia INTEGER, raca VARCHAR(50), nasc DATE, peso FLOAT, consumo_alimento FLOAT, leite_quantidade FLOAT, leite_ph FLOAT)
   # ''', posicao
   # cursor.execute(create_table)
   # cursor.commit()

    


if __name__=='__main__':
    app.run(debug=True)