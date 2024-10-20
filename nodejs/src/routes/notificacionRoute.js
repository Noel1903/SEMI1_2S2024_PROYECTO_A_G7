const express = require('express');
const router = express.Router();

//Importacionde los modulos de notificacionController
const {
    crearNotificacionController,
    obtenerTodoNotificacionController,
    obtenerTodoNotificacionUsuarioController,
    holaNotificacionController
} = require('../controllers/notificacionController');

// Rutas para Notificacion
router.post('/create_notifications', crearNotificacionController); // crear course para foto
router.get('/get_notifications',obtenerTodoNotificacionController);//obtener todos los cursos existentes
router.post('/get_notifications_user',obtenerTodoNotificacionUsuarioController);//Obtiene todos los cursos del usuario

router.get('/hola_notificacion',holaNotificacionController); //test prueba


module.exports = router;
