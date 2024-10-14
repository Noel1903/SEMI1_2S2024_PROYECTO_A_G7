const express = require('express');
const router = express.Router();


const multer = require('multer');

// Configura multer
const storage = multer.memoryStorage();  // Puedes usar diskStorage si prefieres guardar en disco
const upload = multer({ storage: storage });

//Importacionde los modulos de playlistController
const {
    crearTareaController,
    modificarTareaController,
    eliminarTareaController,
    holaTareaController
} = require('../controllers/tareaController');

// Rutas para tareas
router.post('/create_task',   crearTareaController); // crear task
router.put('/modify_task',    modificarTareaController); // modificar los datos de un task
router.delete('/delete_task', eliminarTareaController); //borrar una task

router.get('/hola_task',holaTareaController); //test prueba

module.exports = router;
