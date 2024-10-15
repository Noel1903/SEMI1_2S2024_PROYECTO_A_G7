const {connection} = require('../../config/database');
const {getDateTime,getLocalTime} = require('../models/fechaModel');

/************************************************************************************
 * 
 * 
 *   OPERACIONES PLAYLIST
 * 
 * 
 ************************************************************************************/
// Crea un Curso
exports.crearCursoService = async function(crearCurso){
    //implementar la conexion con el bucker s3 y la db
    let conexion;
    try {
          conexion = await connection();
    } catch (error) {
          return {status:503, data:{error:`Erro al conectar a la base de datos: ${error}`}};
    }
    //variables
     const {name, credits, start_time, end_time} = crearCurso;
     n_start_time = getDateTime(start_time);
     n_end_time = getDateTime(end_time);

     //implementado s3

     try {
          sqlComandCreateCurso = `INSERT INTO courses (name,credits,start_time,end_time) VALUES ("${name}",${credits},"${n_start_time}","${n_end_time}");`
          const [resultCreateCurso] = await conexion.query(sqlComandCreateCurso);

          if(resultCreateCurso.affectedRows === 0){
               return {status:500, data:{error:`Error, no se pudo crear Curso`}};
          }
          
          sqlComandGetCurso = `SELECT c.id_course, c.name, c.credits, c.start_time, c.end_time FROM courses c WHERE c.id_course = ${resultCreateCurso.insertId};`

          let [resultGetCurso] = await conexion.query(sqlComandGetCurso);

          if(resultGetCurso.length === 0){
               return {status:500, data:{error:`Error al obtener el Curso`}};
          }
          resultGetCurso[0].start_time = getLocalTime(resultGetCurso[0].start_time);
          resultGetCurso[0].end_time = getLocalTime(resultGetCurso[0].end_time);

          return {status:200,data:resultGetCurso[0]};
     } catch (error) {
          return {status:500, data:{error:`Error al crear Curso ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }    

}

//obtiene un Curso a traves de su id
exports.obtenerCursoService = async function(obtenerCurso){
     //por implementar s3 y db
     let conexion;
     const {id_course} = obtenerCurso

     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la debe ${error}`}};
     }

     try {
          sqlComand = `SELECT c.id_course, c.name, c.credits, c.start_time, c.end_time FROM courses c WHERE c.id_course  = ${id_course};`
          let [resultGetCurso] = await conexion.query(sqlComand);
          
          if(resultGetCurso.length === 0 ){
               return {status:404, data:{error:"Error,no se puede obtener este curso"}};
          }
          
          resultGetCurso[0].start_time = getLocalTime(resultGetCurso[0].start_time);
          resultGetCurso[0].end_time = getLocalTime(resultGetCurso[0].end_time);
          
          return {status:200, data:resultGetCurso[0]};

     } catch (error) {
          return {status:500, data:{error:`Error al obtener Curso ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     } 
     
}

//obtiene todos los  Cursoes de un usuario con su id
exports.obtenerTodoCursoUsuarioService = async function(obtenerCurso){
     //por implementar  db
     let conexion;
     const {id_user} = obtenerCurso

     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la debe ${error}`}};
     }

     try {
          sqlComand = `SELECT  c.id_course, c.name, c.credits, c.start_time, c.end_time FROM courses c 
                       INNER JOIN schedules s ON c.id_course = s.id_course
                       INNER JOIN users u ON s.id_user = u.id_user WHERE u.id_user = ${id_user} ;`
          let [resultGetAllCurso] = await conexion.query(sqlComand);
          
          for(let i= 0 ; i < resultGetAllCurso.length; i++){

               resultGetCurso[i].start_time = getLocalTime(resultGetCurso[i].start_time);
               resultGetCurso[i].end_time = getLocalTime(resultGetCurso[i].end_time);
          }
          return {status:200,data:resultGetAllCurso};

     } catch (error) {
          return {status:500, data:{error:`Error al obtener Curso ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }
     
}



//modifica el Curso actual
exports.modificarCursoService = async function(modificarCurso){
     //implementacion de la db
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la base de datos ${error}`}};
     }
     //variables
     const {id_course,name,credits,start_time,end_time} = modificarCurso.body;
     
     try {
          sqlComandMod = `UPDATE courses SET name = "${name}", credits = ${credits}, start_time = "${getDateTime(start_time)}", end_time = "${getDateTime(end_time)}" WHERE id_course = ${id_course};`;
          let [resultModCurso] = await conexion.query(sqlComandMod);
          

          if(resultModCurso.affectedRows === 0){
               return {status:404, data:{error:`Error, no se encontro Curso a modificar`}};     
          }

          sqlComandGetCurso = `SELECT c.id_course,c.name,c.credits,c.start_time, c.end_time FROM courses c WHERE c.id_course =  ${id_course};`;
          let [resultGetCurso] = await conexion.query(sqlComandGetCurso);
     
          if(resultGetCurso.length === 0){
               return {status:404, data:{error:`Error, no se encontro recordatorio a obtener`}};     
          }

          resultGetCurso[0].start_time = getLocalTime(resultGetCurso[0].start_time);
          resultGetCurso[0].end_time = getLocalTime(resultGetCurso[0].end_time);

          return {status:200, data:resultGetRecordatorio[0]};


     } catch (error) {
          return {status:500, data:{error:`Erro al modificar Curso ${error}`}};    
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }

}


//Elemina un Curso con su id
exports.eliminarCursoService = async function(eliminarCurso){
     //por implementar db
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la base de datos ${error}`}};
     }

     
     try {
          
          // Inicio de eliminacion de Curso en db
          let sqlComand = `DELETE FROM courses WHERE id_course =  "${eliminarCurso.id_course}";`

          const[resultDeleteCurso] = await conexion.query(sqlComand);

          if(resultDeleteCurso.affectedRows === 0){
               return {status:404, data:{error:'Error no se encontro Curso a eliminar'}};
          }
          return {status:200,data:{message:'Curso eliminado exitosamente!!!'}};

     } catch (error) {
          return {status:500, data:{error:`Error al eliminar Curso ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }

         
}


exports.holaCursoService = function(){ 
     return new Promise(function(resolve,reject){
          resolve("Hola Mundo desde Curso!!!!!");
         
     });
     
}
     
     