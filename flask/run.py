from flask import Flask
from routes.users import *
from routes.courses import *
from routes.reminders import *
from routes.tasks import *
from routes.schedules import *
from routes.notifications import *
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
app.add_url_rule('/delete_user', 'delete_user', delete_user, methods=['DELETE'])
#obtener todos los usuarios
app.add_url_rule('/get_users', 'get_users', get_users, methods=['GET'])

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



############ Rutas de tareas
#crear tarea
app.add_url_rule('/create_task', 'create_task', create_task, methods=['POST'])
#obtener todas las tareas
app.add_url_rule('/get_tasks', 'get_tasks', get_tasks, methods=['GET'])
#Obtener tarea por id 
app.add_url_rule('/get_task', 'get_task', get_task, methods=['POST'])
#Actualizar tarea
app.add_url_rule('/update_task', 'update_task', update_task, methods=['PUT'])
#ELIMINAR tarea
app.add_url_rule('/delete_task', 'delete_task', delete_task, methods=['DELETE'])

#Subir una tarea
app.add_url_rule('/upload_task', 'upload_task', upload_task, methods=['POST'])


############## Rutas de horarios
#Crear un horario
app.add_url_rule('/create_schedule', 'create_schedule', create_schedule, methods=['POST'])
#Obtener todos los horarios
app.add_url_rule('/get_schedules', 'get_schedules', get_schedules, methods=['GET'])
#Obtener horario por id
app.add_url_rule('/get_schedule', 'get_schedule', get_schedule, methods=['POST'])
#Obtener horario por usuario
app.add_url_rule('/get_schedules_by_user', 'get_schedules_by_user', get_schedules_by_user, methods=['POST'])
#Actualizar horario
app.add_url_rule('/update_schedule', 'update_schedule', update_schedule, methods=['PUT'])
#Eliminar un horario
app.add_url_rule('/delete_schedule', 'delete_schedule', delete_schedule, methods=['DELETE'])

############## Rutas de notificaciones
#obtener notificaciones por usuario
app.add_url_rule('/get_notifications_user', 'get_notifications_user', get_notifications_user, methods=['POST'])
#obtener todas las notificaciones
app.add_url_rule('/get_notifications', 'get_notifications', get_notifications, methods=['GET'])


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)