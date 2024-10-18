from dotenv import load_dotenv
import os
import boto3
from werkzeug.utils import secure_filename
from botocore.exceptions import NoCredentialsError



# Configuración del cliente S3
s3_client = boto3.client('s3',
    region_name=os.getenv('S3_REGION'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

rekognition_client = boto3.client(
    'rekognition',
    region_name=os.getenv('S3_REGION'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID_REK'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY_REK')
)

def upload_img_perfil(file):
    response = None
    try:
        filename = secure_filename(file.filename)
        key = f"imagenes_perfil/{filename}"
        s3_client.upload_fileobj(file, os.getenv('S3_BUCKET'),key)
        file_url = f"https://{os.getenv('S3_BUCKET')}.s3.amazonaws.com/{key}"
        response = file_url
    except NoCredentialsError:
        print('Credenciales de AWS no configuradas')
        response = None
    return response

def upload_task_file(file):
    response = None
    try:
        filename = secure_filename(file.filename)
        key = f"documentos_tareas/{filename}"
        s3_client.upload_fileobj(file, os.getenv('S3_BUCKET'),key)
        file_url = f"https://{os.getenv('S3_BUCKET')}.s3.amazonaws.com/{key}"
        response = file_url
    except NoCredentialsError:
        print('Credenciales de AWS no configuradas')
        response = None
    return response

def upload_img_Facial(file):
    response = None
    try:
        filename = secure_filename(file.filename)
        key = f"reconocimiento_facial/{filename}"
        s3_client.upload_fileobj(file, os.getenv('S3_BUCKET'),key)
        file_url = f"https://{os.getenv('S3_BUCKET')}.s3.amazonaws.com/{key}"
        response = file_url
    except NoCredentialsError:
        print('Credenciales de AWS no configuradas')
        response = None
    return response