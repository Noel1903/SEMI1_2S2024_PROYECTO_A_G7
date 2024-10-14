const {
    crearTareaService,
    modificarTareaService,
    eliminarTareaService,
    holaTareaService   
    } = require('../services/tareaService');

/************************************************************************************
 * 
 * 
 *   OPERACIONES Task
 * 
 * 
 ************************************************************************************/

exports.crearTareaController = async (req, res) => {
    // Implementación para registrar un nuevo usuario
    // Llamada de funcion registrarUsuarioService
    
    crearTareaService(req.body)
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

exports.modificarTareaController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    modificarTareaService(req)
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

exports.eliminarTareaController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    eliminarTareaService(req.body)
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
exports.holaTareaController = async (req, res) => {
    // Implementación para obtener un hola mundo
    holaTareaService().then((result)=>{
        return res.status(200).json({status:200,mensaje:"Hola tarea correctamente",datosPlaylist:result})    
    })
    .catch((error)=>{
        return res.status(400).json({status:400,mensaje:"Error al obtener hola tarea",errorPlaylist:error.message})
    })  
};

