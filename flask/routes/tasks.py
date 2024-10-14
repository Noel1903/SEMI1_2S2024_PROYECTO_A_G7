from flask import request, jsonify
from sqlalchemy.orm import Session
from datetime import datetime
from models.tasks import *
from db.db import get_db


# Crear una tarea
def create_task():
    data = request.get_json()
    db: Session = next(get_db())
    try:
        # La fecha ya está en formato 'YYYY-MM-DD' como se espera
        date_str = data['date']
        
        # La hora se recibe en formato 'HH:MM', que se debe combinar con la fecha
        hour_str = data['hour']  # Formato 'HH:MM'
        datetime_str = f"{date_str} {hour_str}:00"  # Combinar en 'YYYY-MM-DD HH:MM:SS'
        datetime_obj = datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')

        task = Task(
            name=data['name'],
            description=data['description'],
            date=date_str,  # La fecha directamente en el campo 'date'
            hour=datetime_obj,  # Fecha y hora combinadas para 'hour'
            id_course=data['id_course']
        )
        db.add(task)
        db.commit()
        response = {
            "id_task": task.id_task,
            "name": task.name,
            "description": task.description,
            "date": task.date,
            "hour": task.hour,
            "id_course": task.id_course
        }
        db.close()
        return jsonify(response), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500


# Obtener todas las tareas
def get_tasks():
    db: Session = next(get_db())
    tasks = db.query(Task).all()
    response = []
    for task in tasks:
        response.append({
            "id_task": task.id_task,
            "name": task.name,
            "description": task.description,
            "date": task.date,
            "hour": task.hour,
            "id_course": task.id_course
        })
    db.close()
    return jsonify(response), 200


# Obtener una tarea por id
def get_task():
    data = request.get_json()
    task_id = data.get('id_task')

    if task_id is None:
        db.close()
        return jsonify({'message': 'id_task es requerido'}), 400

    db: Session = next(get_db())
    task = db.query(Task).filter(Task.id_task == task_id).first()

    if task is None:
        db.close()
        return jsonify({'message': 'Tarea no encontrada'}), 404

    response = {
        "id_task": task.id_task,
        "name": task.name,
        "description": task.description,
        "date": task.date,
        "hour": task.hour,
        "id_course": task.id_course
    }
    db.close()
    return jsonify(response), 200


# Actualizar una tarea parcialmente
def update_task():
    data = request.get_json()
    db: Session = next(get_db())
    task = db.query(Task).filter(Task.id_task == data.get('id_task')).first()
    
    if task is None:
        db.close()
        return jsonify({'message': 'Tarea no encontrada'}), 404
    
    try:
        # Verifica si cada campo viene en el JSON y actualiza solo los presentes
        if 'name' in data:
            task.name = data['name']
        if 'description' in data:
            task.description = data['description']
        if 'date' in data:
            task.date = data['date']
        if 'hour' in data:
            hour_str = data['hour']
            if 'date' in data:  # Si también viene la fecha
                datetime_str = f"{data['date']} {hour_str}:00"
            else:  # Si no viene la fecha, usa la fecha existente en la base de datos
                datetime_str = f"{task.date} {hour_str}:00"
            task.hour = datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')
        if 'id_course' in data:
            task.id_course = data['id_course']
        
        db.commit()
        
        response = {
            "id_task": task.id_task,
            "name": task.name,
            "description": task.description,
            "date": task.date,
            "hour": task.hour,
            "id_course": task.id_course
        }
        db.close()
        return jsonify(response), 200

    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500


# Eliminar una tarea
def delete_task():
    data = request.get_json()
    db: Session = next(get_db())
    task = db.query(Task).filter(Task.id_task == data['id_task']).first()
    if task is None:
        db.close()
        return jsonify({'message': 'Tarea no encontrada'}), 404
    try:
        db.delete(task)
        db.commit()
        db.close()
        return jsonify({'message': 'Tarea eliminada con éxito'}), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500
