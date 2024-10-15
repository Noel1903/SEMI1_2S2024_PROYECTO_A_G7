const express = require('express');
const router = express.Router();


const multer = require('multer');

// Configura multer
const storage = multer.memoryStorage();  // Puedes usar diskStorage si prefieres guardar en disco
const upload = multer({ storage: storage });

//Importacionde los modulos de playlistController
const {
    crearRecordatorioController,
    obtenerRecordatorioController,
    obtenerTodoRecordatorioUsuarioController,
    modificarRecordatorioController,
    eliminarRecordatorioController,
    holaRecordatorioController
} = require('../controllers/recordatorioController');

// Rutas para album
router.post('/create_reminder',upload.single('url_img'), crearRecordatorioController); // crear album para foto
router.post('/get_reminder',obtenerRecordatorioController);//obtener todas las playlist relacionadas con el usuario
router.post('/get_reminders_user',obtenerTodoRecordatorioUsuarioController);//Obtiene todos los albumes del usuario
router.put('/modify_reminder',modificarRecordatorioController); // modificar los datos de un album
router.delete('/delete_reminder', eliminarRecordatorioController); //borrar una album

router.get('/hola_reminder',holaRecordatorioController); //test prueba


module.exports = router;
