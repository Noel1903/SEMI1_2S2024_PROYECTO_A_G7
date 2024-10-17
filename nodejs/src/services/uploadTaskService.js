//const {RegistrarUsuario} = require("../models/registrarUsuarioModel")
//const {RegistrarUsuario} = require("../models/registrarUsuarioModel")
const { PutObjectCommand,DeleteObjectCommand} = require('@aws-sdk/client-s3')
const {s3} = require('../../config/awsS3')

const {connection} = require('../../config/database');
const { uploadFile,deleteFile } = require('../models/s3Model');

/************************************************************************************
 * sacado del album practica2 
 * 
 *   OPERACIONES Tarea
 * 
 * 
 ************************************************************************************/
// Crea una tarea
exports.crearUploadTaskService = async function(crearUploadTask){
    //implementar la conexion con el bucker s3 y la db
    let conexion;
    try {
          conexion = await connection();
    } catch (error) {
          return {error:`Error al conectar a la base de datos: ${error.message}`}
    }
                //variables
      
     const {id_upload,state,date,id_user,id_task} = crearUploadTask.body;
     const file_dir = 'https://proyecto-semi1-a-g7.s3.amazonaws.com/documentos_tareas/';
 
     let file_url = `${file_dir}${crearUploadTask.file.originalname}`;
     let nameFile = crearUploadTask.file.originalname;

               //implementado s3
          
      const subirFile = new uploadFile(crearUploadTask.file);
      // Crear y enviar el comando de subida
      const command = new PutObjectCommand(subirFile);
     try{    
          await s3.send(command);
          console.log('Archivo subido a S3:',file_dir);
  
     } catch (error){
          return {status:500,data:{error:`Error al subir uploadTask en s3 errro:${error}`}};
     }

     try {
          // Convertir la fecha del formato de string a DATE para SQL
          date_time = getDateTime(date);
  
          const query = 'INSERT INTO upload_task (id_upload,file,state,date,id_user,id_task) VALUES (?,?,?,?,?,?)';
          const [resultCreateTask,fieldsCrearteTask] = await conexion.query(query, [id_upload,file_url,state,date_time,id_user,id_task]);

          if(resultCreateTask.affectedRows === 0){
               return {error:`Error, no se pudo crear updatetask`};
          }
          
          sqlComandGetTask = `SELECT p.id_upload FROM upload_task p WHERE p.id_upload = ${resultCreateTask.insertId};`

          const [resultGetTask,fieldsGetTask] = await conexion.query(sqlComandGetTask);

          if(resultGetTask.length === 0){
               return {error:`Error al obtener el uploadtask`}
          }
          return resultGetTask[0];

     } catch (error) {
          return {status:500, data:{error:`Error al insertar datos upload task !!! error ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
      }

}

//modifica la tarea actual
exports.modificarUploadTaskService = async function(modificarUploadTask){
     //implementacion de la db
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {error:`Error al conectarse a la base de datos ${error.message}`};
     }
     //variables
     const {id_upload,state,date,id_user,id_task} = modificarUploadTask.body;
     const file_dir = 'https://proyecto-semi1-a-g7.s3.amazonaws.com/documentos_tareas/';
 
     let file_url = `${file_dir}${modificarUploadTask.file.originalname}`;
     let nameFile = modificarUploadTask.file.originalname;

               //implementado s3
          
      const subirFile = new uploadFile(modificarUploadTask.file);
      // Crear y enviar el comando de subida
      const command = new PutObjectCommand(subirFile);
      try{    
          await s3.send(command);
          console.log('Archivo subido a S3:',file_dir);
  
     } catch (error){
          return {status:500,data:{error:`Error al subir uploadTask en s3 errro:${error}`}};
     }
     
     try {
          // Convertir la fecha del formato de string a DATE para SQL
          date_time = getDateTime(date);
  
          const query = 'UPDATE upload_task SET id_upload = ?,file = ?,state = ?,date = ?,id_user= ?,id_task= ?';
          const [resultModTask,fieldsModTask] = await conexion.query(query, [id_upload,file_url,state,date_time,id_user,id_task]);
        
          if(resultModTask.affectedRows === 0){
               return {error:`Error, no se encontro upload tarea al modificar`};     
          }

          return {message:`upload task modificado correctamente!!!!`};

     } catch (error) {
          return {status:500, data:{error:`Error al modificar datos upload task !!! error ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
      }

}


//Elemina una tarea con su id
exports.eliminarUploadTaskService = async function(eliminarTarea){
     //por implementar db
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {error:`Error al conectarse a la base de datos ${error.message}`};
     }    
     
     const {id_upload} = eliminarTarea;
     sqlComandUpload = `SELECT tas.name FROM upload_task ut INNER JOIN tasks tas ON ut.id_task = tas.id_task WHERE ut.id_upload = ${id_upload};`
     const [resultDocumentUser] = conexion.query(sqlComandUpload);
     console.log(resultDocumentUser);

     try {
          const deleteF = new deleteFile(resultDocumentUser);
          const commandDelete = new DeleteObjectCommand(deleteF);
          await s3.send(commandDelete);
          
          const query = 'DELETE FROM upload_task WHERE id_upload = ?';
          const [resultDeleteTask,fieldsDeleteTask] = await conexion.query(query, [id_upload]);
          
          if(resultDeleteTask.affectedRows === 0){
               return {error:'Error no se encontro task a eliminar'};
          }
          return {message:'task eliminado exitosamente!!!'};

     } catch (error) {
          return {status:500, data:{error:`Error al eliminar datos uload taks !!! error ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }     
     
     
}


exports.holaUploadTaskService = function(){ 
     return new Promise(function(resolve,reject){
          resolve("Hola Mundo!!!!!");
         
     });
     
}

