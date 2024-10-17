const {
    crearUploadTaskService,
    modificarUploadTaskService,
    eliminarUploadTaskService,
    holaUploadTaskService
    } = require('../services/tareaService');

/************************************************************************************
 * 
 * 
 *   OPERACIONES Uploadtask
 * 
 * 
 ************************************************************************************/

exports.crearUploadTaskController = async (req, res) => {
    // Implementación para registrar un nuevo usuario
    // Llamada de funcion registrarUsuarioService
    
    crearUploadTaskService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Se ha creado playlist exitosamente!!!","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al generar playlist!!!","errorPlaylist":err.message});
            return  res.json(err.message);
        }
    )

};

exports.modificarUploadTaskController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    modificarUploadTaskService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Playlist modificado exitosamente!!","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al modificar playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};

exports.eliminarUploadTaskController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    eliminarUploadTaskService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Playlist eliminado exitosamente","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al eliminar playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};


/***************************************************************************************************** */
// Controladores para hola mundo
exports.holaUploadTaskController = async (req, res) => {
    // Implementación para obtener un hola mundo
    holaUploadTaskService().then((result)=>{
        return res.status(200).json({status:200,mensaje:"Hola tarea correctamente",datosPlaylist:result})    
    })
    .catch((error)=>{
        return res.status(400).json({status:400,mensaje:"Error al obtener hola tarea",errorPlaylist:error.message})
    })  
};

