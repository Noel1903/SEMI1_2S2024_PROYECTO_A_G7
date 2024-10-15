//const {RegistrarUsuario} = require("../models/registrarUsuarioModel")
//const {RegistrarUsuario} = require("../models/registrarUsuarioModel")
/*
const { PutObjectCommand} = require('@aws-sdk/client-s3')
const {uploadImage} = require("../models/s3Model")
const {s3} = require('../../config/awsS3')
*/
const {connection} = require('../../config/database')

/************************************************************************************
 * sacado del tareaService.js 
 * 
 *   OPERACIONES Horario
 * 
 * 
 ************************************************************************************/
// Crea un horario
exports.crearHorarioService = async function(crearHorario){
    //implementar la conexion con el bucker s3 y la db
    let conexion;
    try {
          conexion = await connection();
    } catch (error) {
          return {error:`Error al conectar a la base de datos: ${error.message}`}
    }
                //variables
      
     const {id_schedule,datetime_start,datetime_end,id_user,id_course} = crearHorario;
     
               //implementado s3

     try {
          // Convertir la fecha del formato de string a DATE para SQL
          const formattedDate_s = new Date(datetime_start);
          const formattedDate_e = new Date(datetime_end); 
  
          const query = 'INSERT INTO schedules (id_schedule,datetime_start,datetime_end,id_user,id_course) VALUES (?,?,?,?,?)';
          const [resultCreateHorario,fieldsCrearteHorario] = await conexion.query(query, [id_schedule,formattedDate_s,formattedDate_e,id_user,id_course]);

          if(resultCreateHorario.affectedRows === 0){
               return {error:`Error, no se pudo crear horario`};
          }
          
          sqlComandGetHorario = `SELECT p.id_schedule FROM shedules p WHERE p.id_schedule = ${resultCreateHorario.insertId};`

          const [resultGetHorario,fieldsGetTask] = await conexion.query(sqlComandGetTask);

          if(resultGetHorario.length === 0){
               return {error:`Error al obtener el horario`}
          }
          return resultGetHorario[0];

     } catch (error) {
          return {error:`Error al crear horario ${error.message}`};
     }      

}

//modifica la tarea actual
exports.modificarHorarioService = async function(modificarHorario){
     //implementacion de la db
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {error:`Error al conectarse a la base de datos ${error.message}`};
     }
     //variables
     const {id_schedule,datetime_start,datetime_end,id_user,id_course} = modificarHorario.body;
     
     try {
          // Convertir la fecha del formato de string a DATE para SQL
          const formattedDate_s = new Date(datetime_start);
          const formattedDate_e = new Date(datetime_end); 
  
          const query = 'UPDATE schedules SET datetime_start=?,datetime_end=?,id_user=?,id_course=? WHERE id_schedule=?';
          const [resultModSchedules,fieldsModSchedules] = await conexion.query(query, [formattedDate_s,formattedDate_e,id_user,id_course,id_schedule]);
        
          if(resultModSchedules.affectedRows === 0){
               return {error:`Error, no se encontro calendario al modificar`};     
          }

          return {message:`calendario modificado correctamente!!!!`};

     } catch (error) {
          return {error:`Error al modificar calendario ${error.menssage}`};    
     }

}


//Elemina una tarea con su id
exports.eliminarHorarioService = async function(eliminarHorario){
     //por implementar db
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {error:`Error al conectarse a la base de datos ${error.message}`};
     }
     
     const {id_schedule} = eliminarHorario;
     

     try {
          const query = 'DELETE FROM schedules WHERE id_schedule = ?';
          const [resultDeleteSchedule,fieldsDeleteTask] = await conexion.query(query, [id_schedule]);
          
          if(resultDeleteSchedule.affectedRows === 0){
               return {error:'Error no se encontro calendario a eliminar'};
          }
          return {message:'calendario eliminado exitosamente!!!'};
     } catch (error) {
          return {error:`Error al eliminar calendario ${error.message}`};
     }
         

         
     
     
}


exports.holaHorarioService = function(){ 
     return new Promise(function(resolve,reject){
          resolve("Hola Mundo!!!!!");
         
     });
     
}