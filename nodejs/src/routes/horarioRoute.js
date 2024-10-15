const express = require('express');
const router = express.Router();


const multer = require('multer');

// Configura multer
const storage = multer.memoryStorage();  // Puedes usar diskStorage si prefieres guardar en disco
const upload = multer({ storage: storage });

//Importacionde los modulos de horarioController
const {
    crearHorarioController,
    modificarHorarioController,
    eliminarHorarioController,
    holaHorarioController
} = require('../controllers/horarioController');

// Rutas para tareas
router.post('/create_schedule',   crearHorarioController); // crear Horario
router.put('/modify_schedule',    modificarHorarioController); // modificar los datos de un Horario
router.delete('/delete_schedule', eliminarHorarioController); //borrar una Horario

router.get('/hola_task',holaHorarioController); //test prueba

module.exports = router;
