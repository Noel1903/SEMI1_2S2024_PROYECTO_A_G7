from flask import request, jsonify
from sqlalchemy.orm import Session
from datetime import datetime
from models.users import *
from db.db import get_db
from routes.uploadfile import *  # método de subir imagen
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import os
import base64


def login():
    data = request.get_json()
    db: Session = next(get_db())
    user = db.query(User).filter(User.email == data['email']).first()
    if user is None:
        db.close()
        return jsonify({'message':'Usuario no encontrado'})
    if not user.check_password(data['password']):
        db.close()
        return jsonify({'message':'Contraseña incorrecta'})
    response = {
        "id_user": user.id_user,
        "username": user.username,
        "email": user.email,
        "url_img": user.url_img,
        "role": user.role,
        "url_rekognition": user.url_rekognition
    }
    db.close()
    return jsonify(response),200


# Método para obtener información de un usuario específico
def get_user():
    data = request.get_json()  # Obtener los datos del cuerpo de la solicitud
    user_id = data.get('id_user')  # Obtener el 'id_user' del JSON

    if user_id is None:
        db.close()
        return jsonify({'message': 'id_user es requerido'}), 400  # Validación si falta el id_user

    db: Session = next(get_db())  # Obtener la sesión de la base de datos
    user = db.query(User).filter(User.id_user == user_id).first()  # Buscar usuario por id_user

    if user is None:
        db.close()
        return jsonify({'message': 'Usuario no encontrado'}), 404  # Retornar error si el usuario no existe

    # Crear la respuesta con la información del usuario
    response = {
        "id_user": user.id_user,
        "username": user.username,
        "email": user.email,
        "url_img": user.url_img
    }
    db.close()
    return jsonify(response), 200  # Retornar la información del usuario



def create_user():
    db: Session = next(get_db())

    # Obtener los datos del formulario form-data
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    #confirm_password = request.form.get('confirm_password')  # Obtener el campo de confirmación de contraseña
    file = request.files.get('url_img')  # Obtener el archivo de imagen desde el form-data
    role = request.form.get('role')
    
    # Subir la imagen de perfil a S3
    image_url = upload_img_perfil(file)
    if not image_url:
        db.close()
        return jsonify({"message": "Error al subir la imagen"}), 500

    # Crear el nuevo usuario
    try:
        new_user = User(
            username=username,
            email=email,
            password=bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),  # Encriptar la contraseña
            url_img=image_url,
            role=role
        )
        db.add(new_user)
        db.commit()
        db.close()
        return jsonify({"message": "Usuario registrado con éxito"}), 201
    except Exception as e:
        db.rollback()
        db.close()
        return jsonify({"message": f"Error al registrar usuario: {str(e)}"}), 500
    


def update_user():
    db: Session = next(get_db())

    user_id = request.form.get('id_user')
    new_password = request.form.get('password')
    #confirm_password = request.form.get('confirm_password')
    username = request.form.get('username')
    email = request.form.get('email')
    file = request.files.get('url_img')

    if not user_id:
        db.close()
        return jsonify({'message': 'id_user es requerido'}), 400

    user = db.query(User).filter(User.id_user == user_id).first()
    if user is None:
        db.close()
        return jsonify({'message': 'Usuario no encontrado'}), 404

    # Actualizar los campos del usuario solo si se proporcionan
    if username:
        user.username = username
    if email:
        user.email = email
    if new_password:
        
        user.set_password(new_password)  # Encriptar la nueva contraseña
    if file:
        # Subir la nueva imagen de perfil a S3
        image_url = upload_img_perfil(file)
        if image_url:
            user.url_img = image_url

    try:
        db.commit()
        db.close()
        return jsonify({'message': 'Usuario actualizado con éxito'}), 200
    except Exception as e:
        db.rollback()
        db.close()
        return jsonify({'message': f'Error al actualizar usuario: {str(e)}'}), 500

