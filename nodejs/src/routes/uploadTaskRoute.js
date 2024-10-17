const express = require('express');
const router = express.Router();


const multer = require('multer');

// Configura multer
const storage = multer.memoryStorage();  // Puedes usar diskStorage si prefieres guardar en disco
const upload = multer({ storage: storage });

//Importacionde los modulos de playlistController
const {
    crearUploadTaskController,
    modificarUploadTaskController,
    eliminarUploadTaskController,
    holaUploadTaskController
} = require('../controllers/uploadTaskController');

// Rutas para tareas
router.post('/create_Uploadtask',crearUploadTaskController); // crear task
router.put('/modify_Uploadtask',modificarUploadTaskController); // modificar los datos de un task
router.delete('/delete_Uploadtask', eliminarUploadTaskController); //borrar una task
router.get('/hola_Uploadtask', holaUploadTaskController); //borrar una task

module.exports = router;
