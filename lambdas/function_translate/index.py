import boto3
import json
import base64

# Clientes AWS
s3 = boto3.client('s3')
translate = boto3.client('translate')
textract = boto3.client('textract')

# Idiomas a los que traduciremos
TARGET_LANGUAGES = ['es', 'fr', 'de']  # Español, Francés, Alemán

def lambda_handler(event, context):
    try:
        # Obtener datos del evento (API Gateway)
        body = json.loads(event['body'])
        bucket_name = body['bucket']
        key = body['key']

        # Obtener el archivo desde S3
        file_obj = s3.get_object(Bucket=bucket_name, Key=key)
        content_type = file_obj['ContentType']
        file_content = file_obj['Body'].read()

        # Verificar si es texto o imagen
        if content_type.startswith('text/'):
            original_text = file_content.decode('utf-8')
        elif content_type.startswith('image/'):
            original_text = extract_text_from_image(bucket_name, key)
        else:
            return {"statusCode": 400, "body": "Formato no soportado"}

        # Traducir el texto a los idiomas definidos
        translations = {}
        for lang in TARGET_LANGUAGES:
            translated_text = translate.translate_text(
                Text=original_text,
                SourceLanguageCode='auto',
                TargetLanguageCode=lang
            )['TranslatedText']
            translations[lang] = translated_text

        # Devolver las traducciones como respuesta JSON
        return {
            "statusCode": 200,
            "body": json.dumps({"original": original_text, "translations": translations})
        }

    except Exception as e:
        return {"statusCode": 500, "body": str(e)}

def extract_text_from_image(bucket, key):
    """Usa Textract para extraer texto de imágenes."""
    response = textract.detect_document_text(
        Document={'S3Object': {'Bucket': bucket, 'Name': key}}
    )
    extracted_text = ' '.join([item['Text'] for item in response['Blocks'] if item['BlockType'] == 'LINE'])
    return extracted_text
