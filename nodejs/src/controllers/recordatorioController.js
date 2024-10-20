const {
    crearRecordatorioService,  
    obtenerRecordatorioService,
    obtenerTodoRecordatorioUsuarioService,
    modificarRecordatorioService,  
    eliminarRecordatorioService, 
    holaRecordatorioService,
} = require('../services/recordatorioService');

/************************************************************************************
 * 
 * 
 *   OPERACIONES IMAGE
 * 
 * 
 ************************************************************************************/

exports.crearRecordatorioController = async (req, res) => {
    // Implementación para registrar un nuevo usuario
    // Llamada de funcion registrarUsuarioService
    
    crearRecordatorioService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Se ha creado playlist exitosamente!!!","datosPlaylist":result});
        const{status, data} = result;
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

exports.obtenerRecordatorioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    obtenerRecordatorioService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Lista de playlist obtenida exitosamente","datosPlaylist":result});
        const{status, data} = result;
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

exports.obtenerTodoRecordatorioUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    obtenerTodoRecordatorioUsuarioService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Lista de playlist obtenida exitosamente","datosPlaylist":result});
        const{status, data} = result;
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

exports.modificarRecordatorioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    modificarRecordatorioService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Playlist modificado exitosamente!!","datosPlaylist":result});
        const{status, data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al modificar playlist!!!","errorPlaylist":err.message});
            return   res.json(err);
        }
    )
};

exports.eliminarRecordatorioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    eliminarRecordatorioService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Playlist eliminado exitosamente","datosPlaylist":result});
        const{status, data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al eliminar playlist!!!","errorPlaylist":err.message});
            return   res.json(err);
        }
    )
};


/***************************************************************************************************** */
// Controladores para hola mundo
exports.holaRecordatorioController = async (req, res) => {
    // Implementación para obtener un hola mundo
    holaRecordatorioService().then((result)=>{
        return res.status(200).json({status:200,mensaje:"Hola image correctamente"})    
    })
    .catch((error)=>{
        return res.status(400).json({status:400,mensaje:"Error al obtener hola image"})
    })  
};
