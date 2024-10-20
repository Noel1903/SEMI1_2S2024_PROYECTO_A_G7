const {connection} = require('../../config/database');
const {getDateTime,getLocalTime} = require('../models/fechaModel');

/************************************************************************************
 * 
 * 
 *   OPERACIONES PLAYLIST
 * 
 * 
 ************************************************************************************/
// Crea un Notificacion
exports.crearNotificacionService = async function(crearNotificacion){
    //implementar la conexion con el bucker s3 y la db
    let conexion;
    try {
          conexion = await connection();
    } catch (error) {
          return {status:503, data:{error:`Erro al conectar a la base de datos: ${error}`}};
    }
    //variables
     const {message, type, datetime_notification, id_user} = crearNotificacion;
     //n_datatime_notification = getDateTime(datatime_notification);

     //implementado s3

     try {
          sqlComandCreateNotificacion = `INSERT INTO notifications (message,type,datetime_notification,id_user) VALUES ("${message}",${type},"${datetime_notification}",${id_user});`
          const [resultCreateNotificacion] = await conexion.query(sqlComandCreateNotificacion);

          if(resultCreateNotificacion.affectedRows === 0){
               return {status:500, data:{error:`Error, no se pudo crear Notificacion`}};
          }
          
          sqlComandGetNotificacion = `SELECT n.id_notification, n.message, n.type, n.datetime_notification, n.id_user FROM notifications n WHERE n.id_notification = ${resultCreateNotificacion.insertId};`

          let [resultGetNotificacion] = await conexion.query(sqlComandGetNotificacion);

          if(resultGetNotificacion.length === 0){
               return {status:500, data:{error:`Error al obtener el Notificacion`}};
          }
          
          return {status:200,data:resultGetNotificacion[0]};
     } catch (error) {
          return {status:500, data:{error:`Error al crear Notificacion ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }    

}


//obtiene un Notificacion a traves de su id
exports.obtenerTodoNotificacionService = async function(){
     //por implementar s3 y db
     let conexion;
     
     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la debe ${error}`}};
     }

     try {
          sqlComand = `SELECT n.id_notification, n.message, n.type, n.datatime_notification, n.id_user FROM notifications;`
          let [resultAllGetNotificacion] = await conexion.query(sqlComand);
          
          return {status:200, data:resultAllGetNotificacion};

     } catch (error) {
          return {status:500, data:{error:`Error al obtener Notificacion ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     } 
     
}

//obtiene todos los  Notificaciones de un usuario con su id
exports.obtenerTodoNotificacionUsuarioService = async function(obtenerNotificacion){
     //por implementar  db
     let conexion;
     const {id_user} = obtenerNotificacion

     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la debe ${error}`}};
     }

     try {
          
          sqlComand = `SELECT n.id_notification, n.message, n.type, n.datetime_notification, n.id_user FROM notifications n
                       INNER JOIN users u ON n.id_user = u.id_user WHERE u.id_user = ${id_user} ;`
          let [resultGetAllNotificacion] = await conexion.query(sqlComand);
          console.log(`Resultado de notificacion: ${resultGetAllNotificacion}`);
          
          return {status:200,data:resultGetAllNotificacion};

     } catch (error) {
          return {status:500, data:{error:`Error al obtener Notificacion ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }
     
}


exports.holaNotificacionService = function(){ 
     return new Promise(function(resolve,reject){
          resolve("Hola Mundo desde Notificacion!!!!!");
         
     });
     
}
     
     