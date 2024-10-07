# SEMI1_2S2024_PROYECTO_A_G7

# CURSO
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
## POST:localhost:5000/get_all_course_user

```javascript
// request
{
    "id_user":1
}

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