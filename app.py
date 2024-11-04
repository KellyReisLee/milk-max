from flask import Flask, render_template, redirect, session, request
import psycopg2
from psycopg2.extras import RealDictCursor
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

# Número de vacas
VACAS = []

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


if __name__=='__main__':
    app.run(debug=True)