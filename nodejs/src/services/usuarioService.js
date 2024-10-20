
const { PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command} = require('@aws-sdk/client-s3'); 
//const {RegistrarUsuario} = require("../models/registrarUsuarioModel")
const {uploadImage,deleteImage,getAllImageS3} = require("../models/s3Model")
const {connection} = require('../../config/database')
const {s3} = require('../../config/awsS3')
const {EncriptarPass,CompararPass} = require('../models/encriptar');
const {compareFaceImageS3} = require('../models/rekognitionModel');

// imporacion de libreria rekognition
const {rekognition} = require('../../config/awsRekognition');
const {CompareFacesCommand } = require('@aws-sdk/client-rekognition');
/************************************************************************************
 * 
 * 
 *   OPERACIONES USUARIO
 * 
 * 
 ************************************************************************************/
//variables globales
//fotos perfil
const fotoPerfil = 'https://proyecto-semi1-a-g7.s3.amazonaws.com/imagenes_perfil/';

//fotos reconocimiento facial
const fotoReconocimientoFacial = 'https://proyecto-semi1-a-g7.s3.amazonaws.com/reconocimiento/';

// Implementación de servicios para registrar usuario
exports.registrarUsuarioService = async function(registrarUsuario){
    //implementar la conexion con el bucker s3 y la db

    //variables
    const {username, email, password,role} = registrarUsuario.body;
    nuevoPassword = '';
    
    try {
          nuevoPassword = await EncriptarPass(password);
    } catch (error) {
          return {status:500, data:{error:`Error al encriptar password usuario en nodejs u ${error}`}}
    }
    //borrar por si acaso
    
    let photo_url = `${fotoPerfil}${registrarUsuario.file.originalname}`;
    let nameImage = registrarUsuario.file.originalname;
    
    
    
    //implementado s3
    // carpetas de s3 -> (documentos_tareas,imagenes_perfil, reconocimiento)
    const subirImagen = new uploadImage("imagenes_perfil",registrarUsuario.file);
    const command = new PutObjectCommand(subirImagen);
     try {
          await s3.send(command);

     } catch (error) {
          return {status:500,data:{error:`Error al subir imagen en s3 errro:${error}`}};
     }
     
     let conexion
     try {
         
          conexion = await connection();// se llamo la funcion conexion en dbconfig

          sqlComandVerificar = `SELECT COUNT(*) as Contador FROM users WHERE username = "${username}" or email = "${email}"`;
          const [resultVerificar] = await conexion.query(sqlComandVerificar);
          
          if(resultVerificar[0].Contador === 0){
               
               sqlComandUser = `INSERT INTO users(username,email,password,role,url_img) VALUES ("${username}","${email}","${nuevoPassword}","${role}","${photo_url}");`;
               const [resultUser] = await conexion.query(sqlComandUser);
               
               //resultado al insrtar un usuario
               if(resultUser.affectedRows === 0){
                    return {status:409,message:"Error, No se puede crear este usuario...."};
               }
               //const idUser = resultUser.insertId;

               return {status:201, data:{message:"Usuario creado correctamente!!!"}};
          }else{
               return {status:409, data:{message:"Error, nombre de usuario o correo ya existentes!!!"}};
          }
          
     } catch (error) {
          //Este error sale cuando no hay modulos importados, librerias o consultas mal escritas.
          return {status:400, data:{error:`Error al crear usuario datos en incorrectos. Error->${error}`}};
     }finally{
          if (conexion) await conexion.end(); // Cerrando la conexión a la base de datos
     }
     

}

exports.modificarUsuarioService = async function(modificarUsuario){
     //variables
     const {id_user,username,email,password} = modificarUsuario.body;
     let photo_url = `${fotoPerfil}${modificarUsuario.file.originalname}`;
     let nombreImagen = modificarUsuario.file.originalname;
    
     //implementado s3
     try {
          const subirImagen = new uploadImage("imagenes_perfil",modificarUsuario.file);
          const command = new PutObjectCommand(subirImagen);
          await s3.send(command);

     } catch (error) {
          return {status:502, data:{error:`Error al subur fotos en s3 error ${error}`}};
     }
     
     let conexion; //variable de conexion a la db
     try {
          conexion = await connection();// abre conexion a la bases de datos

          // count(*) nos verifica si existen datos repitentes o no para agregar los nuevos cambios
          sqlComandVerificar = `SELECT COUNT(*) as Contador FROM users WHERE username = "${username}" OR email = "${email}";`;
          const [resultVerificar] = await conexion.query(sqlComandVerificar);

          if(resultVerificar[0].Contador === 0){
               //obtener la contrasena del usuario
               sqlComandPass = `SELECT u.password as pass FROM users u WHERE u.id_user =  ${id_user};`
               const [resultPass] = await conexion.query(sqlComandPass);
               let passEncriptada = resultPass[0].pass;

               if(passEncriptada === undefined ){
                    return {status:400, data:{error:"La contrasenia del usuario no exitste!!!!"}};
               }
               
               //Se comparan los pass si es verdad devuelve un booleano
               let esContrasenia = await CompararPass(password,passEncriptada);

               if(esContrasenia){
                    //actualizacion del usuario
                    sqlComandUpdate = `UPDATE users SET username = "${username}",email = "${email}", url_img = "${photo_url}" WHERE id_user = ${id_user} and password = "${passEncriptada}";`
                    const [resultModificarUsuario] = await conexion.query(sqlComandUpdate);

                    if(resultModificarUsuario.affectedRows === 0){
                         return {status:404, data:{message:"Error, usuario a modificar no existe!!!"}};
                    }

                    return {status:200, data:{message:"Usuario modificado correctamente!!"}};
               }
               return {status:401, data:{message:"Error, La contraseña es incorrecta, verificar...."}};
               
          }else{
               return {status:409, data:{message:"Error al modicar datos, username o correo repedito..."}};
          }
                   
     
     } catch (error) {
          return {status:500, data:{error:`Error al modificar datos usuarios !!! error ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
      }
}

//Obtener un usuario por su id
exports.obtenerUsuarioService = async function(obtenerUsuario){
     //por crear conexion 
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la base de datos ${error}`}};
     }
     
     
     try {
         
          sqlComand = `SELECT u.id_user, u.username, u.password, u.email, u.url_img FROM users u WHERE u.id_user =  ${obtenerUsuario.id_user};`
          const [resultGetUser, fieldsGetUser] = await conexion.query(sqlComand);
          
          if(resultGetUser.length === 0){
               return{status:404, data:{error:"Error, el usuario a obtener no existe"}};
          }
          
          return {status:200,data:resultGetUser[0]};

     } catch (error) {
          return {status:500, data:{error:`Error al obtener usuario ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
      }
              
     
}
// Obtenemos todos los usuarios 
exports.obtenerTodoUsuarioService = async function(){
     //por crear conexion 
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la base de datos ${error}`}};
     }
     
     try {
         
          sqlComand = `SELECT u.id_user, u.username, u.password, u.email, u.url_img FROM users;`
          const [resultAllGetUser] = await conexion.query(sqlComand);
          
          if(resultAllGetUser.length === 0){
               return{status:404, data:{error:"Error, el usuario a obtener no existe"}};
          }
          
          return {status:200,data:resultAllGetUser};

     } catch (error) {
          return {status:500, data:{error:`Error al obtener usuario ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
      }
              
     
}

// Eliminar un usuario por su id
exports.eliminarUsuarioService = async function(eliminarUsuario){
     //por implementar
     let conexion;
     try {
          conexion = await connection();
     } catch (error) {
          return {status:500,data:{error:`Error en la conexion en la bade de datos ${error}`}};
     }
     
     try {

          //eliminacion de documentos de usuario en bucket
          slqComandDocumentUser = `SELECT  ut.id_upload, ut.file FROM upload_task ut 
               INNER JOIN users u  ON ut.id_user = u.id_user WHERE u.id_user = ${eliminarUsuario.id_user};`

          const [resultDocumentUser] = conexion.query(sqlComandDocumentUser);
          
          // ANALIZAR AQUI VER SI NO DA ERROR
          console.log(resultDocumentUser);
          console.log("id_upload:",resultDocumentUser[0].id_upload);
          console.log("file:",resultDocumentUser[0].file);

          //Eliminacion de documentos en el bucket
          for (let i = 0; i < resultDocumentUser.length; i++) {
               // Encontrar el primer '/' después de 'https:'
               let index = resultDocumentUser[i].file.indexOf('/', 8); // 8 es la longitud de 'https://'
               // Separar en dos partes: antes del primer '/' y después
               let resto = resultDocumentUser[i].file.substring(index + 1); // 'Fotos_Perfil/magodeOzI.jpeg'

               // Dividir el resto por '/' para obtener las otras dos partes
               let splitResto = resto.split('/');

               const deleteImagen = new deleteImage(splitResto[0],splitResto[1]);
               const commandDelete = new DeleteObjectCommand(deleteImagen);
               await s3.send(commandDelete);
          }
          
          // Eliminacion de upload_task con el usuario
          for(let task of resultDocumentUser){

               // Eliminacion de upload_task relacionados con el usuario en db
               try {
                    let sqlComandDeleteUploadTask = `DELETE FROM upload_task ut WHERE ut.id_upload = ${task.id_upload};`;
                    const[resultDeleteUploadTask] = await conexion.query(sqlComandDeleteUploadTask);

               } catch (error) {
                    return {status:500, data:{error:`Error al eliminar tarea en  en upload_task ${error}`}};
               }
               
          }

          // Eliminacion de notificaciones con el usuario
          let sqlComandDeleteNotification = `SELECT n.id_notification FROM notifications n 
                              INNER JOIN users u ON n.id_user  = u.id_user  WHERE u.id_user = ${eliminarUsuario.id_user};`;

          const[resultDeleteNotification] = await conexion.query(sqlComandDeleteNotification);

          for(let notification of resultDeleteNotification){
               try {
                    let sqlComandDeleteNotificationUser = `DELETE FROM image i WHERE i.id_image = ${notification.id_notification};`;
                    const[resultDeleteNotification] = await conexion.query(sqlComandDeleteNotificationUser);

               } catch (error) {
                    return {status:500, data:{error:`Error al eliminar notificaciones de usuario ${error}`}};
               }

          }

          // Eliminacion de schedules con el usuario
          let sqlComandSelectSchedule = `SELECT s.id_schedule FROM schedules s 
                              INNER JOIN users u ON s.id_user  = u.id_user  WHERE u.id_user = ${eliminarUsuario.id_user};`;

          const[resultSelectChedule] = await conexion.query(sqlComandSelectSchedule);

          for(let schedule of resultSelectChedule){
               try {
                    let sqlComandDeleteSchedule = `DELETE FROM schedules s WHERE s.id_schedule = ${schedule.id_schedule};`;
                    const[resultDeleteSchedule] = await conexion.query(sqlComandDeleteSchedule);

               } catch (error) {
                    return {status:500, data:{error:`Error al eliminar horarios de usuario ${error}`}};
               }

          }

          // Eliminacion de reminders con el usuario
          let sqlComandSelectReminders = `SELECT s.id_schedule FROM schedules s 
                              INNER JOIN users u ON s.id_user  = u.id_user  WHERE u.id_user = ${eliminarUsuario.id_user};`;

          const[resultSelectReminders] = await conexion.query(sqlComandSelectReminders);

          for(let reminder of resultSelectReminders){
               try {
                    let sqlComandDeleteReminder = `DELETE FROM schedules s WHERE s.id_schedule = ${reminder.id_reminder};`;
                    const[resultDeleteReminder] = await conexion.query(sqlComandDeleteReminder);

               } catch (error) {
                    return {status:500, data:{error:`Error al eliminar recordatorios de usuario ${error}`}};
               }

          }

          //inicio de eliminacino de usuariollllll
          sqlComandDeleteUser = `DELETE FROM users WHERE id_user =  "${eliminarUsuario.id_user}";`
          const [resultDeleteUser] = conexion.query(sqlComandDeleteUser);

          if(resultDeleteUser.affectedRows === 0 ){
               return {status:404,data:{error:`Error al eliminar usuario no existe`}};
          }

          return {status:200, data:{message:"Usuario eliminado exitosamente!!!"}};

     } catch (error) {

          return {status:500, data:{error:`Error al eliminar usuario ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
      }
          
     
}

 
exports.loginUsuarioService = async function(loginUsuario){
     
     //obteniendo los datos
     const {email,password} = loginUsuario;
     let conexion ;
     try {
          conexion = await connection();
     } catch (error) {
          return {status:503, data:{error:`Error al conectarse a la bades de datos ${error}`}};
     }

     try {

          //validar si es nombre usuario o correo
          let sqlComandPass;
          const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
          
          if (regex.test(email)){
               //para correo
               sqlComandPass = `SELECT u.password FROM users u WHERE u.email =  "${email}";`;
          } else {
               //para nombre usuario
               sqlComandPass = `SELECT u.password FROM users u WHERE u.username =  "${email}";`;
          }

          //recuperar lapass
          passEncriptado = ''
          //por implementar
          const[resultLog,fieldsLog] = await conexion.query(sqlComandPass);

          if(resultLog.length === 0){
               return {status:401, data:{error:"Error al logearse no se encontro contraseña"}};
          }

          passEncriptado = resultLog[0].password;
          let esCorrectoPass = await CompararPass(password,passEncriptado);
          
          if(esCorrectoPass){
               sqlComandSuccess = `SELECT u.id_user FROM users u WHERE u.password =  "${passEncriptado}";`
               const[resultLogSuccess,fieldsLogSuccess] = await conexion.query(sqlComandSuccess);
               
               return {status:200,data:resultLogSuccess[0]};

          }else{
               return {status:401, data:{error:"Error contrasena incorrecta"}};
          }

          
     } catch (error) {
          return {status:500, data:{error:`error al logearse ${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
      }
     
                         
}

/**
 * Login de reconocimiento facial
 */
exports.loginUsuarioFaceService = async function(loginUsuarioFacial){
     
     //Obtener todas las imagenes en el bucket s3
     let listaImagenesReconocimientoFacial;
     try {
          // Listar objetos en la carpeta
         listaImagenesReconocimientoFacial = await s3.send(new ListObjectsV2Command(getAllImageS3("reconocimiento")));
         
     } catch (error) {
          return {status:500, data:{error:`Error al obtener imagenes en el bucket error ${error}`}};
     }

     let conexion ;
     try {
          // Solicitamos el reconocimiento de caras
          
          for(let usuarioFacial of listaImagenesReconocimientoFacial.Contents){
               
               let tempPath = usuarioFacial.Key.split('/');

               if(tempPath.length === 2 && tempPath[0]!== '' && tempPath[1] !== ''){

                    const paramsRekognitionCompareFace = new compareFaceImageS3(loginUsuarioFacial.file,usuarioFacial.Key);
                    const commandCompareFace = new CompareFacesCommand(paramsRekognitionCompareFace);
                    const response = await rekognition.send(commandCompareFace);

                    let encabezadoPath = 'https://proyecto-semi1-a-g7.s3.amazonaws.com/';
                    if(response.FaceMatches.length !== 0 && response.FaceMatches[0].Similarity > 90){
                         // se crea la conexion con la db si tod esta correcto
                         
                         try {
                              conexion = await connection();
                         } catch (error) {
                              return {status:503, data:{error:`Error al conectarse a la bades de datos ${error}`}};
                         }

                         let pathImagenUsuario = encabezadoPath + usuarioFacial.Key;
                         console.log(pathImagenUsuario);
                         
                         sqlComandUsuario = `SELECT u.id_user FROM users u WHERE u.url_rekognition  = "${pathImagenUsuario}"`;
                         const[resultLogSuccess] = await conexion.query(sqlComandUsuario);
                         return {status:200, data:{id_user:resultLogSuccess[0].id_user}};
                         //return response;
                    }
               }
               
          }
          
          return {status:404, data:{message:`Este usuario no existe en reconocimiento facial`}}; 
 
     } catch (error) {
          
           return {status:500, data:{error:`Error al comparar cara en recognition:${error}`}};
     }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
     }
                         
}

// Creacion de Reconocimieno facial
exports.crearFacialUsuarioService = async function(registrarFacialUsuario){
     //implementar la conexion con el bucker s3 y la db
 
     //variables
     const {id_user} = registrarFacialUsuario.body;
      
     let photo_url = `${fotoReconocimientoFacial}${registrarFacialUsuario.file.originalname}`;
     
     //implementado s3
     
     const subirImagen = new uploadImage("reconocimiento",registrarFacialUsuario.file);
     const command = new PutObjectCommand(subirImagen);
     try {
           await s3.send(command);
 
     } catch (error) {
           return {status:502, data:{error:`Error al subir imagen en s3 errro:${error}`}};
     }
         
      
     let conexion;
      try {
 
          conexion = await connection();// se llamo la funcion conexion en dbconfig
         
          // actualizar tabla usuario
          sqlComandImage = `UPDATE users SET url_rekognition = "${photo_url}" WHERE id_user = ${id_user};`;
          const [resultImageRekognition] = await conexion.query(sqlComandImage);

          if(resultImageRekognition.affectedRows === 0){
               return {status:500, data:{message:"Error, No se puede actualizar imagen de reconocimiento facial"}};
          }
          return {status:201, data:{message:"Reconocimiento facial de usuario creado con exito"}};
      } catch (error) {
           
           return {status:400, data:{error:`Error al crear usuario y album,datos en incorrectos. Error Sql:${error}`}};
      }finally {
          if (conexion) await conexion.end(); // Cierra la conexión a la base de datos
      }
      
 
 }

exports.holaUsuarioService = function(){ 
     return Promise.resolve({status:200,data:{message:"Hola Mundo Usuario!!!!!"}}); 
}
     
     