from flask import request, jsonify
from sqlalchemy.orm import Session
from datetime import datetime
from models.courses import *
from db.db import get_db
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import os
import base64

def get_notifications_user():
    data = request.get_json()
    db: Session = next(get_db())
    try:
        notifications = db.query(Notification).filter(Notification.id_user == data['id_user']).all()
        response = []
        for notification in notifications:
            response.append({
                "id_notification": notification.id_notification,
                "name": notification.name,
                "description": notification.description,
                "date": notification.date,
                "hour": notification.hour,
                "id_user": notification.id_user
            })
        db.close()
        return jsonify(response), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500
    

def  get_notifications():
    db: Session = next(get_db())
    try:
        notifications = db.query(Notification).all()
        response = []
        for notification in notifications:
            response.append({
                "id_notification": notification.id_notification,
                "name": notification.name,
                "description": notification.description,
                "date": notification.date,
                "hour": notification.hour,
                "id_user": notification.id_user
            })
        db.close()
        return jsonify(response), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500



