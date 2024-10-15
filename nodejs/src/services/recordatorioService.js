const {connection} = require('../../config/database');
const {getDateTime,getLocalTime,getFecha} = require('../models/fechaModel');

/************************************************************************************
 * 
 * 
 *   OPERACIONES Recordatorio
 * 
 * 
 ************************************************************************************/

// Crea un imagen
exports.crearRecordatorioService = async function(crearRecordatorio){
    //implementar la conexion con el bucker s3 y la db
    let conexion;
    try {
          conexion = await connection();
    } catch (error) {
          return {status:500, data:{error:`Erro al conectar a la base de datos: ${error}`}};
    }
    //variables
     
     const {name,description,date,hour,id_user} = crearRecordatorio.body;
 
     try {
          sqlComandCreateRecordatorio = `INSERT INTO reminders (name,description,date,hour,id_user) VALUES ("${name}","${description}","${date}","${getDateTime(hour)}",${id_user});`
          const [resultCreateRecordatorio] = await conexion.query(sqlComandCreateRecordatorio);

          //console.log(resultCreateRecordatorio);
          if(resultCreateRecordatorio.affectedRows === 0){
               return {status:500, data:{error:`Error, no se pudo crear recordatorio`}};
          }
          
          sqlComandGetRecordatorio = `SELECT r.id_reminder, r.name,r.description,r.date,r.hour,r.id_user FROM reminders r WHERE r.id_reminder = ${resultCreateRecordatorio.insertId};`

          let [resultGetRecordatorio] = await conexion.query(sqlComandGetRecordatorio);

          if(resultGetRecordatorio.length === 0){
               return {status:500, data:{error:`Error al obtener el recordatorio`}};
          }

          resultGetRecordatorio[0].date = getFecha(resultGetRecordatorio[0].date);
          resultGetRecordatorio[0].hour = getLocalTime(resultGetRecordatorio[0].hour);
         
          return {status:200,data:resultGetRecordatorio[0]};

     } catch (error) {
          return {status:500, data:{error:`Error al crear recordatorio ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }     

}

//obtiene un recordatorio a traves de su id
exports.obtenerRecordatorioService = async function(obtenerRecordatorio){
     //por implementar s3 y db
     let conexion;
     const {id_reminder} = obtenerRecordatorio

     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la debe ${error}`}};
     }

     try {
          sqlComand = `SELECT r.id_reminder,r.name,r.description,r.date,r.hour,r.id_user FROM reminders r WHERE r.id_reminder  = ${id_reminder};`
          const [resultGetRecordatorio,fieldsGetAlbum] = await conexion.query(sqlComand);
          
          if(resultGetRecordatorio.length === 0 ){
               return {status:404, data:{error:"Error,no existe este recordatorio"}};
          }

          resultGetRecordatorio[0].date = getFecha(resultGetRecordatorio[0].date);
          resultGetRecordatorio[0].hour = getLocalTime(resultGetRecordatorio[0].hour);

          return {status:200,data:resultGetRecordatorio[0]};

     } catch (error) {
          
          return {status:500, data:{error:`Error al obtener recordatorio ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }
     
}

//obtiene todos los de un usuario con su id
exports.obtenerTodoRecordatorioUsuarioService = async function(obtenerRecordatorionAlbum){
     //por implementar  db
     let conexion;
     const {id_user} = obtenerRecordatorionAlbum
     
     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la debe ${error}`}};
     }

     try {
          sqlComand = `SELECT  r.id_reminder,r.name,r.description,r.date,r.hour,r.id_user FROM reminders r
          INNER JOIN users u  ON r.id_user  = u.id_user WHERE u.id_user = ${id_user} ;`
          
          let [resultGetAllRecordatorio] = await conexion.query(sqlComand);
          
          for(let i= 0 ; i < resultGetAllRecordatorio.length; i++){

               resultGetAllRecordatorio[i].date = getFecha(resultGetAllRecordatorio[i].date);
               resultGetAllRecordatorio[i].hour = getLocalTime(resultGetAllRecordatorio[i].hour);
          }
          return {status:200,data:resultGetAllRecordatorio};

     } catch (error) {
          return {status:500, data:{error:`Error al obtener album ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }
     
}



//modifica el recordatorio actual
exports.modificarRecordatorioService = async function(modificarRecordatorio){
     //implementacion de la db
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la base de datos ${error}`}};
     }
     //variables
     const {id_reminder,name,description,date,hour,id_user} = modificarRecordatorio.body;
     
     try {
          sqlComandMod = `UPDATE reminders SET name = "${name}", description = "${description}", date = "${date}", hour = "${hour}", id_user = ${id_user} WHERE id_reminder = ${id_reminder};`;
          const [resultModRecordatorio] = await conexion.query(sqlComandMod);
          
          if(resultModRecordatorio.affectedRows === 0){
               return {status:404, data:{error:`Error, no se encontro recordatorio a modificar`}};     
          }

          sqlComandGetRecordatorio = `SELECT r.id_reminder,r.name,r.description,r.date, r.hour, r.id_user FROM reminders r WHERE r.id_reminder =  ${id_reminder};`;
          const [resultGetRecordatorio] = await conexion.query(sqlComandGetRecordatorio);
          

          if(resultGetRecordatorio.length === 0){
               return {status:404, data:{error:`Error, no se encontro recordatorio a obtener`}};     
          }

          //aqui solo retornamos las horas, min, seg le quitamos la fecha
          resultGetRecordatorio[0].date = getFecha(resultGetRecordatorio[0].date);
          resultGetRecordatorio[0].hour = getLocalTime(resultGetRecordatorio[0].hour);

          return {status:200, data:resultGetRecordatorio[0]};

     } catch (error) {
          return {status:500, data:{error:`Erro al modificar recordatorio ${error}`}};    
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }

}


//Elemina un recordatorio con su id
exports.eliminarRecordatorioService = async function(eliminarRecordatorio){
     //por implementar db
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la base de datos ${error}`}};
     }

     
     try {

          //Eliminacion de recordatorio en db
          let sqlComand = `DELETE FROM reminders r WHERE r.id_reminder = ${eliminarRecordatorio.id_reminder};`;
          const[resultDeleteRecordatorio] = await conexion.query(sqlComand);

          if(resultDeleteRecordatorio.affectedRows === 0){
               return {status:404,data:{error:'Error no se encontro recordatorio a eliminar'}};
          }
          
          return {status:200, data:{message:'Recordatorio eliminado exitosamente!!!'}};
     } catch (error) {
          return {status:500, data:{error:`Error al eliminar recordatorio ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }     
     
}


//========================================================================
exports.holaRecordatorioService = function(){ 
     return new Promise(function(resolve,reject){
          resolve("Hola Mundo desde Recordatorio!!!!!");
         
     });
     
}
     
     