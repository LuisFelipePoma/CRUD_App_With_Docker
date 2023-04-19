from flask import Flask, jsonify, render_template, request
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

# Configuración de la conexión a la base de datos
app.config['MYSQL_HOST'] = '54.144.226.186'
app.config['MYSQL_USER'] = 'support'
app.config['MYSQL_PASSWORD'] = 'sistemas20.'
app.config['MYSQL_DB'] = 'emerginet'

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

@app.route('/personal')
def obtener_usuarios():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM personal")
    usuarios = cursor.fetchall()
    return jsonify(usuarios)

@app.route('/equipo')
def obtener_equipo():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM equipo")
    usuarios = cursor.fetchall()
    return jsonify(usuarios)


@app.route('/insert_personal',methods=['GET','POST'])
def insert_personal():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json(silent=TRUE)
        nombre_personal=post_data.get('nombre_personal')
        apellido_pat=post_data.get('apellido_pat')
        apellido_mat=post_data.get('apellido_mat')
        Tipo_Personal=post_data.get('Tipo_Personal')

        print(nombre_personal)
        print(apellido_pat)
        print(apellido_mat)

        sql = "INSERT INTO members(nombre_personal, apellido_pat, apellido_mat, Tipo_Personal) VALUES(%s, %s, %s, %s)"
        data = (nombre_personal, apellido_pat, apellido_mat, Tipo_Personal)
        cursor = mysql.connection.cursor()
        cursor.execute(sql, data)
        mysql.connect.commit()

        response_object['message']="Successfully Added"
    return jsonify(response_object)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)