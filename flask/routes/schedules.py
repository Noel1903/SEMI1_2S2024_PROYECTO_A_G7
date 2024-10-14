from flask import request, jsonify
from sqlalchemy.orm import Session
from models.schedules import Schedule
from db.db import get_db
from datetime import datetime

# Crear un horario
def create_schedule():
    data = request.get_json()
    db: Session = next(get_db())
    try:
        # Formato de fecha y hora
        datetime_start = datetime.strptime(data['datetime_start'], '%Y-%m-%d %H:%M:%S')
        datetime_end = datetime.strptime(data['datetime_end'], '%Y-%m-%d %H:%M:%S')

        schedule = Schedule(
            datetime_start=datetime_start,
            datetime_end=datetime_end,
            id_user=data['id_user'],
            id_course=data['id_course']
        )
        db.add(schedule)
        db.commit()
        response = {
            "id_schedule": schedule.id_schedule,
            "datetime_start": schedule.datetime_start,
            "datetime_end": schedule.datetime_end,
            "id_user": schedule.id_user,
            "id_course": schedule.id_course
        }
        db.close()
        return jsonify(response), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500

# Obtener un horario por ID
def get_schedule():
    data = request.get_json()
    schedule_id = data.get('id_schedule')

    if schedule_id is None:
        return jsonify({'message': 'id_schedule es requerido'}), 400

    db: Session = next(get_db())
    schedule = db.query(Schedule).filter(Schedule.id_schedule == schedule_id).first()

    if schedule is None:
        db.close()
        return jsonify({'message': 'Horario no encontrado'}), 404

    response = {
        "id_schedule": schedule.id_schedule,
        "datetime_start": schedule.datetime_start,
        "datetime_end": schedule.datetime_end,
        "id_user": schedule.id_user,
        "id_course": schedule.id_course
    }
    db.close()
    return jsonify(response), 200


# Obtener todos los horarios
def get_schedules():
    db: Session = next(get_db())
    schedules = db.query(Schedule).all()
    response = []
    for schedule in schedules:
        response.append({
            "id_schedule": schedule.id_schedule,
            "datetime_start": schedule.datetime_start,
            "datetime_end": schedule.datetime_end,
            "id_user": schedule.id_user,
            "id_course": schedule.id_course
        })
    db.close()
    return jsonify(response), 200


# Actualizar un horario
def update_schedule():
    data = request.get_json()
    db: Session = next(get_db())
    schedule = db.query(Schedule).filter(Schedule.id_schedule == data['id_schedule']).first()
    
    if schedule is None:
        db.close()
        return jsonify({'message': 'Horario no encontrado'}), 404
    
    try:
        # Verifica si cada campo viene en el JSON y actualiza solo los presentes
        if 'datetime_start' in data:
            schedule.datetime_start = datetime.strptime(data['datetime_start'], '%Y-%m-%d %H:%M:%S')
        if 'datetime_end' in data:
            schedule.datetime_end = datetime.strptime(data['datetime_end'], '%Y-%m-%d %H:%M:%S')
        if 'id_user' in data:
            schedule.id_user = data['id_user']
        if 'id_course' in data:
            schedule.id_course = data['id_course']
        
        db.commit()
        
        response = {
            "id_schedule": schedule.id_schedule,
            "datetime_start": schedule.datetime_start,
            "datetime_end": schedule.datetime_end,
            "id_user": schedule.id_user,
            "id_course": schedule.id_course
        }
        db.close()
        return jsonify(response), 200

    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500

# Eliminar un horario
def delete_schedule():
    data = request.get_json()
    db: Session = next(get_db())
    schedule = db.query(Schedule).filter(Schedule.id_schedule == data['id_schedule']).first()
    
    if schedule is None:
        db.close()
        return jsonify({'message': 'Horario no encontrado'}), 404
    
    try:
        db.delete(schedule)
        db.commit()
        db.close()
        return jsonify({'message': 'Horario eliminado con éxito'}), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500


# Obtener todos los horarios de un usuario
def get_schedules_by_user():
    data = request.get_json()
    id_user = data.get('id_user')

    if id_user is None:
        return jsonify({'message': 'id_user es requerido'}), 400

    db: Session = next(get_db())
    schedules = db.query(Schedule).filter(Schedule.id_user == id_user).all()
    
    if not schedules:
        db.close()
        return jsonify({'message': 'No se encontraron horarios para este usuario'}), 404

    response = []
    for schedule in schedules:
        response.append({
            "id_schedule": schedule.id_schedule,
            "datetime_start": schedule.datetime_start,
            "datetime_end": schedule.datetime_end,
            "id_user": schedule.id_user,
            "id_course": schedule.id_course
        })

    db.close()
    return jsonify(response), 200
