from flask import Flask, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configuración de la conexión a la base de datos
app.config['MYSQL_HOST'] = '44.203.167.254'
app.config['MYSQL_USER'] = 'support'
app.config['MYSQL_PASSWORD'] = 'sistemas20.'
app.config['MYSQL_DB'] = 'crud'

mysql = MySQL(app)


@app.after_request
def allow_cors(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/')
def init():
    return "Inicio"

# Ejemplo de consulta a la base de datos
@app.route('/testing')
def index():
    cursor = mysql.connection.cursor()
    cursor.execute('''SELECT * FROM prueba''')
    result = cursor.fetchall()
    cursor.close()
    return str(result)

@app.route('/api/prueba')
def obtener_usuarios():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM prueba")
    usuarios = cursor.fetchall()
    return jsonify(usuarios)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)