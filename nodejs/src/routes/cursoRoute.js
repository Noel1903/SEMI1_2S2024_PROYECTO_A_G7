const express = require('express');
const router = express.Router();

//Importacionde los modulos de playlistController
const {
    crearCursoController,
    obtenerCursoController,
    obtenerTodoCursoController,
    obtenerTodoCursoUsuarioController,
    modificarCursoController,
    eliminarCursoController,
    holaCursoController
} = require('../controllers/cursoController');

// Rutas para Curso
router.post('/create_course', crearCursoController); // crear course para foto
router.post('/get_course',obtenerCursoController);//obtener un curso con su id
router.get('/get_all_courses',obtenerTodoCursoController);//obtener todos los cursos existentes
router.post('/get_all_course_user',obtenerTodoCursoUsuarioController);//Obtiene todos los cursos del usuario
router.put('/update_course',modificarCursoController); // modificar los datos de un cursos
router.delete('/delete_course', eliminarCursoController); //borrar una course


router.get('/hola_course',holaCursoController); //test prueba


module.exports = router;
