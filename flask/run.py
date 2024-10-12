from flask import Flask
from routes.users import *
from routes.courses import *
from routes.reminders import *
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


#Metodo de Hola Mundo
@app.route('/', methods=['GET'])
def hello_world():
    return 'Hola Mundo!',200

#Rutas de Usuarios
app.add_url_rule('/login_user', 'login',login, methods=['POST'])
#obtener un usuario por id
app.add_url_rule('/get_user', 'get_user', get_user, methods=['POST'])
#registrar un usuario form-data
app.add_url_rule('/create_user', 'create_user', create_user, methods=['POST'])
#actualizar un usuario form-data
app.add_url_rule('/update_user', 'update_user', update_user, methods=['PUT'])
#Eliminar un usuario form-data
#app.add_url_rule('/delete_user', 'delete_user', delete_user, methods=['DELETE'])


############Rutas de Cursos
app.add_url_rule('/create_course', 'create_course', create_course, methods=['POST'])
app.add_url_rule('/get_all_courses', 'get_courses', get_courses, methods=['GET'])
app.add_url_rule('/update_course', 'update_course', update_course, methods=['PUT'])
app.add_url_rule('/delete_course', 'delete_course', delete_course, methods=['DELETE'])

###########Rutas de Recordatorios
app.add_url_rule('/create_reminder', 'create_reminder', create_reminder, methods=['POST'])
app.add_url_rule('/modify_reminder', 'modify_reminder', modify_reminder, methods=['PUT'])
app.add_url_rule('/delete_reminder', 'delete_reminder', delete_reminder, methods=['DELETE'])
app.add_url_rule('/get_reminders_user', 'get_reminders_user', get_reminders_user, methods=['POST'])



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)