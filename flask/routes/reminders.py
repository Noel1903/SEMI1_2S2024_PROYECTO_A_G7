from flask import request, jsonify
from sqlalchemy.orm import Session
from datetime import datetime
from models.schedules import *
from db.db import get_db
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import os
import base64



def create_reminder():
    data = request.get_json()
    db: Session = next(get_db())
    try:
        hour = data['hour']
        datetime_str = f"{data['date']} {hour}:00"
        datetime_obj = datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')
        reminder = Reminder(
            name = data['name'],
            description = data['description'],
            date = data['date'],
            hour = datetime_obj,
            id_user = data['id_user']
        )
        db.add(reminder)
        db.commit()
        response = {
            "id_reminder": reminder.id_reminder,
            "name": reminder.name,
            "description": reminder.description,
            "date": reminder.date,
            "hour": reminder.hour,
            "id_user": reminder.id_user
        }
        db.close()
        return jsonify(response), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500
    

def modify_reminder():
    data = request.get_json()
    db: Session = next(get_db())
    try:
        reminder = db.query(Reminder).filter(Reminder.id_reminder == data['id_reminder']).first()
        if reminder is None:
            db.close()
            return jsonify({'message': 'Recordatorio no encontrado'}), 404
        
        hour = data['hour']
        datetime_str = f"{data['date']} {hour}:00"
        datetime_obj = datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')

        reminder.name = data['name']
        reminder.description = data['description']
        reminder.date = data['date']
        reminder.hour = datetime_obj
        reminder.id_user = data['id_user']
        db.commit()
        response = {
            "id_reminder": reminder.id_reminder,
            "name": reminder.name,
            "description": reminder.description,
            "date": reminder.date,
            "hour": reminder.hour,
            "id_user": reminder.id_user
        }
        db.close()
        return jsonify(response), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500


def delete_reminder():
    data = request.get_json()
    db: Session = next(get_db())
    try:
        reminder = db.query(Reminder).filter(Reminder.id_reminder == data['id_reminder']).first()
        if reminder is None:
            db.close()
            return jsonify({'message': 'Recordatorio no encontrado'}), 404
        db.delete(reminder)
        db.commit()
        db.close()
        return jsonify({'message': 'Recordatorio eliminado'}), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500
    

def get_reminder():
    data = request.get_json()
    db: Session = next(get_db())
    reminder = db.query(Reminder).filter(Reminder.id_reminder == data['id_reminder']).first()
    if reminder is None:
        db.close()
        return jsonify({'message': 'Recordatorio no encontrado'}), 404
    response = {
        "id_reminder": reminder.id_reminder,
        "name": reminder.name,
        "description": reminder.description,
        "date": reminder.date,
        "hour": reminder.hour,
        "id_user": reminder.id_user
    }
    db.close()
    return jsonify(response), 200


def get_reminders_user():
    data = request.get_json()
    db: Session = next(get_db())
    reminders = db.query(Reminder).filter(Reminder.id_user == data['id_user']).all()
    if reminders is None:
        db.close()
        return jsonify({'message': 'Recordatorios no encontrados'}), 404
    response = []
    for reminder in reminders:
        response.append({
            "id_reminder": reminder.id_reminder,
            "name": reminder.name,
            "description": reminder.description,
            "date": reminder.date,
            "hour": reminder.hour,
            "id_user": reminder.id_user
        })
    db.close()
    return jsonify(response), 200