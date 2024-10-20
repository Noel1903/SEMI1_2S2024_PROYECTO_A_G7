const {
    crearNotificacionService,  
    obtenerTodoNotificacionService,
    obtenerTodoNotificacionUsuarioService, 
    holaNotificacionService} = require('../services/notificacionService');

/************************************************************************************
 * 
 * 
 *   OPERACIONES PLAYLIST
 * 
 * 
 ************************************************************************************/

exports.crearNotificacionController = async (req, res) => {
    // Implementación para registrar un nuevo usuario
    // Llamada de funcion registrarUsuarioService
    
    crearNotificacionService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Se ha creado playlist exitosamente!!!","datosPlaylist":result});
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al generar playlist!!!","errorPlaylist":err.message});
            return  res.json(err);
        }
    )

};


exports.obtenerTodoNotificacionController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    obtenerTodoNotificacionService()
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Lista de playlist obtenida exitosamente","datosPlaylist":result});
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener todas las playlist!!!","errorPlaylist":err.message});
            return   res.json(err);
        }
    )
};

exports.obtenerTodoNotificacionUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    obtenerTodoNotificacionUsuarioService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Lista de playlist obtenida exitosamente","datosPlaylist":result});
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener todas las playlist!!!","errorPlaylist":err.message});
            return   res.json(err);
        }
    )
};


/***************************************************************************************************** */
// Controladores para hola mundo
exports.holaNotificacionController = async (req, res) => {
    // Implementación para obtener un hola mundo
    holaNotificacionService().then((result)=>{
        return res.status(200).json({status:200,mensaje:"Hola playlist correctamente"})    
    })
    .catch((error)=>{
        return res.status(400).json({status:400,mensaje:`Error al obtener hola playlist ${error}`})
    })  
};

