//const {RegistrarUsuario} = require("../models/registrarUsuarioModel")
//const {RegistrarUsuario} = require("../models/registrarUsuarioModel")
/*
const { PutObjectCommand} = require('@aws-sdk/client-s3')
const {uploadImage} = require("../models/s3Model")
const {s3} = require('../../config/awsS3')
*/
const {connection} = require('../../config/database')

/************************************************************************************
 * sacado del album practica2 
 * 
 *   OPERACIONES Tarea
 * 
 * 
 ************************************************************************************/
// Crea una tarea
exports.crearTareaService = async function(crearTask){
    //implementar la conexion con el bucker s3 y la db
    let conexion;
    try {
          conexion = await connection();
    } catch (error) {
          return {error:`Error al conectar a la base de datos: ${error.message}`}
    }
                //variables
      
     const {id_task,name,description,date,hour,id_course} = crearTask;
     

               //implementado s3

     try {
          // Convertir la fecha del formato de string a DATE para SQL
          const formattedDate = new Date(date);
  
          const query = 'INSERT INTO tasks (id_task,name,description,date,hour,id_course) VALUES (?,?,?,?,?,?)';
          const [resultCreateTask,fieldsCrearteTask] = await conn.query(query, [id_task,name,description,formattedDate,hour,id_course]);

          if(resultCreateTask.affectedRows === 0){
               return {error:`Error, no se pudo crear task`};
          }
          
          sqlComandGetTask = `SELECT p.id_task, p.name FROM task p WHERE p.id_task = ${resultCreateTask.insertId};`

          const [resultGetTask,fieldsGetTask] = await conexion.query(sqlComandGetTask);

          if(resultGetTask.length === 0){
               return {error:`Error al obtener el task`}
          }
          return resultGetTask[0];

     } catch (error) {
          return {error:`Error al crear task ${error.message}`};
     }      

}

//modifica la tarea actual
exports.modificarTareaService = async function(modificarTask){
     //implementacion de la db
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {error:`Error al conectarse a la base de datos ${error.message}`};
     }
     //variables
     const {id_task,name,description,date,hour,id_course} = modificarTask.body;
     
     try {
          // Convertir la fecha del formato de string a DATE para SQL
          const formattedDate = new Date(date);
  
          const query = 'UPDATE tasks SET name = ?,description = ? ,date = ? ,hour = ?,id_course = ? WHERE id_task = ?';
          const [resultModTask,fieldsModTask] = await conexion.query(query, [name,description,formattedDate,hour,id_course,id_task]);
        
          if(resultModTask.affectedRows === 0){
               return {error:`Error, no se encontro tarea al modificar`};     
          }

          return {message:`tarea modificado correctamente!!!!`};

     } catch (error) {
          return {error:`Error al modificar tarea ${error.menssage}`};    
     }

}


//Elemina una tarea con su id
exports.eliminarTareaService = async function(eliminarTarea){
     //por implementar db
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {error:`Error al conectarse a la base de datos ${error.message}`};
     }
     
     const {id_task} = eliminarTarea;
     

     try {
          const query = 'DELETE FROM tasks WHERE id_task = ?';
          const [resultDeleteTask,fieldsDeleteTask] = await conexion.query(query, [id_task]);
          
          if(resultDeleteTask.affectedRows === 0){
               return {error:'Error no se encontro task a eliminar'};
          }
          return {message:'task eliminado exitosamente!!!'};
     } catch (error) {
          return {error:`Error al eliminar task ${error.message}`};
     }
         

         
     
     
}


exports.holaTareaService = function(){ 
     return new Promise(function(resolve,reject){
          resolve("Hola Mundo!!!!!");
         
     });
     
}
     