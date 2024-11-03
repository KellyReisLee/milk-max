from flask import Flask, render_template, redirect, session, request
import psycopg2
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

# Create a cursor object
cursor = conn.cursor()


@app.route("/")
def index():
    return render_template("index.html")


if __name__=='__main__':
    app.run(debug=True)

conn.close()