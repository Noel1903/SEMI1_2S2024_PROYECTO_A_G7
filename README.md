# SEMI1_2S2024_PROYECTO_A_G7

# ***CURSO***
## Crear Curso
## POST:localhost:5000/create_course

```javascript
// request
{
    "name":"Nombre Curso",
    "credits":10, //Creditos que da el curso
    "start_time":07:10:00, //hh:mm:ss
    "end_time":08:50:00
}

// response

//exito
{
    "name":"Nombre Curso",
    "credits":10, //Creditos que da el curso
    "start_time":07:10:00, //hh:mm:ss
    "end_time":08:50:00
}

//error
{
    "error":"Error al crear curso"
}

```


## Obtener Curso
## POST:localhost:5000/get_course

```javascript
// request
{
    "id_course":1
}

// response

//exito
{
    "name":"Quimica",
    "credits":11, // nuevos creditos del curso
    "start_time":04:30:00, //hh:mm:ss nuevo horario inicio
    "end_time":06:10:00 //nuevo horario fin
}
//error
{
    "error":"Error al obtener curso + error"
}

```

## Obtener todos los curso de usuario
## POST:localhost:5000/get_all_courses

```javascript
// response
//exito
[
    {
        "name":"Quimica",
        "credits":11, // nuevos creditos del curso
        "start_time":04:30:00, //hh:mm:ss nuevo horario inicio
        "end_time":06:10:00 //nuevo horario fin
    },
    {
        "name":"Matematica",
        "credits":10, // nuevos creditos del curso
        "start_time":04:30:00, //hh:mm:ss nuevo horario inicio
        "end_time":06:10:00 //nuevo horario fin
    }
]

// error
{
    "error":"Error al obtener todos los cursos + error"
}

```

## Modificar Curso
## POST:localhost:5000/update_course

```javascript
// request
{
    "id_course" :1 ,
    "name":"nuevo nombre Curso",
    "credits":11, //Creditos que da el curso
    "start_time":04:30:00, //hh:mm:ss
    "end_time":06:10:00
}

// response
//exito
{
    "name":"nuevo nombre Curso",
    "credits":11, // nuevos creditos del curso
    "start_time":04:30:00, //hh:mm:ss nuevo horario inicio
    "end_time":06:10:00 //nuevo horario fin
}

// error
{
    "error":"Error al modificar curso + error"
}

```

## Eliminar Curso
## POST:localhost:5000/delete_course

```javascript
// request
{
    "id_course":1
}

// response
//exito
{
   "message":"Curso Eliminado Correctamente"
}

//error
{
    "error":"Error al eliminar el curso"
}
```
---

# ***Recordatorios - Reminders***
## Crear Recordatorio
## POST:localhost:5000/create_reminder

```javascript
// request
{
    "name":"nombre del recordatorio",
    "description": "Descripción del recordatorio",
    "date":"2024-10-05",
    "hour":"10:00",
    "id_user":1
}

// response
//exito
{
   "message":"Recordatorio creado Correctamente"
}

//error
{
    "error":"Error al crear el recordatorio"
}
```

## Modificar Recordatorio
## PUT:localhost:5000/modify_reminder

```javascript
// request
{
    "id_reminder":1,
    "name":"nombre del recordatorio",
    "description": "Descripción del recordatorio",
    "date":"2024-10-05",
    "hour":"10:00",
    "id_user":1
}

// response
//exito
{
   "message":"Recordatorio modificado Correctamente"
}

//error
{
    "error":"Error al modificar el recordatorio"
}
```

## Eliminar Recordatorio
## DELETE:localhost:5000/delete_reminder

```javascript
// request
{
    "id_reminder":1
}

// response
//exito
{
   "message":"Recordatorio eliminado Correctamente"
}

//error
{
    "error":"Error al eliminar el recordatorio"
}
```



## Obtener Recordatorio por usuarios
## POST:localhost:5000/get_reminders_user

```javascript
// request
{
    "id_user":1
}

// response
//exito
{
   [
    {
        "id_reminder":1,
        "name":"nombre del recordatorio",
        "description": "Descripción del recordatorio",
        "date":"2024-10-05",
        "hour":"10:00",
        "id_user":1
    },
    ...
   ]
}

//error
{
    "error":"Error al obtener los recordatorios"
}
```
---

# ***Tareas - Tasks***
## Crear Tarea
## POST:localhost:5000/create_task

```javascript
// request
{
    "id_task": 12,
    "name":"nombre de la tarea",
    "description": "Descripción de la tarea",
    "date":"2024-10-05",
    "hour":"10:00",
    "id_course": 10
}

// response
//exito
{
   "message":"Tarea creada correctamente"
}

//error
{
    "error":"Error al crear la tarea"
}
```

## Modificar Task
## PUT:localhost:5000/modify_task

```javascript
// request
{
    "id_task": 12,
    "name":"nombre de la tarea",
    "description": "Descripción de la tarea",
    "date":"2024-10-05",
    "hour":"10:00",
    "id_course": 13
}

// response
//exito
{
   "message":"Recordatorio modificado Correctamente"
}

//error
{
    "error":"Error al modificar el recordatorio"
}
```

## Eliminar Task
## DELETE:localhost:5000/delete_task

```javascript
// request
{
    "id_task": 32
}

// response
//exito
{
   "message":"Tarea eliminada correctamente"
}

//error
{
    "error":"Error al eliminar la tarea",
    "id_task eliminado" :32
}
```


# Notificaciones 

## GET: localhost:5000/get_notification_user


```javascript
// request
{
    "id_user": 1
}

// response
//exito
{
   [
    {
        "id_notification":1,
        "message": "mensaje",
        "type":"Reminder",
        "datetime_notification":"2024-10-15",
        "id_user": 1
    }, . . .
   ]
}

//error
{
    "error":"No  existe el id_user"
}
```

## GET: localhost:5000/get_notifications


```javascript

// response
//exito
{
   [
    {
        "id_notification":1,
        "message": "mensaje",
        "type":"Reminder",
        "datetime_notification":"2024-10-15",
        "id_user": 1
    }, . . .
   ]
}

//error
{
    "error":"No hay notificaciones"
}
```


# Subida de tareas
## POST: localhost:5000/upload_task


```javascript

//json
{
    "url_file":"formdata_file",
    "id_user":1,
    "id_task":1
}

// response
//exito
{
   "msg":"Tarea subida correctamente"
}

//error
{
    "error":"No se subió la tarea"
}
```



# Reconocimiento facial

## POST: localhost:5000/create_rekognition
```javascript

//json
{
    "id_user":1,
    "image":"formData"
}

// response
//exito
{
   "msg":"Imagen subida correctamente"
}

//error
{
    "error":"No se subió la imagen"
}
```

## POST: localhost:5000/get_rekognition
```javascript

//json
{
    "image":"formData"
}

// response
//exito
{
    'message': 'Reconocimiento facial exitoso',
    'matched_image': s3_image_key,
    'similarity': similarity,
    'id_user': id_user
}

//error
{
    "error":"No se encontro usuario"
}
```