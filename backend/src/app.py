from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configuración de la conexión a la base de datos
app.config['MYSQL_HOST'] = '54.146.219.27'
app.config['MYSQL_USER'] = 'support'
app.config['MYSQL_PASSWORD'] = 'sistemas20.'
app.config['MYSQL_DB'] = 'emerginet'

mysql = MySQL(app)

@app.route('/')
def init():
    return "Inicio"

# Ejemplo de consulta a la base de datos
@app.route('/testing')
def index():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM equipo''')
    result = cur.fetchall()
    cur.close()
    return str(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)