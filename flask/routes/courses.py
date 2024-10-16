from flask import request, jsonify
from sqlalchemy.orm import Session
from datetime import datetime
from models.courses import *
from db.db import get_db
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import os
import base64


def create_course():
    data = request.get_json()
    db: Session = next(get_db())
    try:
        #obtener la fecha de hoy
        now = datetime.now()
        #convertir la fecha a string
        now_str = now.strftime('%Y-%m-%d')
        start_time= f"{now_str} {data['start_time']}:00"
        start_time_str = datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S')
        end_time= f"{now_str} {data['end_time']}:00"
        end_time_str = datetime.strptime(end_time, '%Y-%m-%d %H:%M:%S')
        course = Course(
            name=data['name'],
            credits=data['credits'],
            start_time=start_time_str,
            end_time=end_time_str,
        )
        db.add(course)
        db.commit()
       

        
        response = {
            "id_course": course.id_course,
            "name": course.name,
            "credits": course.credits,
            "start_time": course.start_time,
            "end_time": course.end_time
        }
        db.close()
        return jsonify(response), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500
    

def get_course():
    data = request.get_json()
    course_id = data.get('id_course')

    if course_id is None:
        db.close()
        return jsonify({'message': 'id_course es requerido'}), 400

    db: Session = next(get_db())
    course = db.query(Course).filter(Course.id_course == course_id).first()

    if course is None:
        db.close()
        return jsonify({'message': 'Curso no encontrado'}), 404

    response = {
        "id_course": course.id_course,
        "name": course.name,
        "credits": course.credits,
        "start_time": course.start_time,
        "end_time": course.end_time
    }
    db.close()
    return jsonify(response), 200


def update_course():
    data = request.get_json()
    db: Session = next(get_db())
    print(data)
    course = db.query(Course).filter(Course.id_course == data['id_course']).first()
    if course is None:
        db.close()
        return jsonify({'message': 'Curso no encontrado'}), 404
    try:
        course.name = data['name']
        course.credits = data['credits']
        #obtener la fecha de hoy
        now = datetime.now()
        #convertir la fecha a string
        now_str = now.strftime('%Y-%m-%d')
        start_time= f"{now_str} {data['start_time']}:00"
        start_time_str = datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S')
        end_time= f"{now_str} {data['end_time']}:00"
        end_time_str = datetime.strptime(end_time, '%Y-%m-%d %H:%M:%S')
        course.start_time = start_time_str
        course.end_time = end_time_str
        db.commit()
        response = {
            "id_course": course.id_course,
            "name": course.name,
            "credits": course.credits,
            "start_time": course.start_time,
            "end_time": course.end_time
        }
        db.close()
        return jsonify(response), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500
    

def delete_course():
    data = request.get_json()
    db: Session = next(get_db())
    course = db.query(Course).filter(Course.id_course == data['id_course']).first()
    if course is None:
        db.close()
        return jsonify({'message': 'Curso no encontrado'}), 404
    try:
        db.delete(course)
        db.commit()
        db.close()
        return jsonify({'message': 'Curso eliminado con éxito'}), 200
    except Exception as e:
        db.close()
        return jsonify({'message': str(e)}), 500
    
def  get_courses():
    db: Session = next(get_db())
    courses = db.query(Course).all()
    response = []
    for course in courses:
        response.append({
            "id_course": course.id_course,
            "name": course.name,
            "credits": course.credits,
            "start_time": course.start_time,
            "end_time": course.end_time
        })
    db.close()
    return jsonify(response),200