const {
    crearCursoService,  
    obtenerCursoService,
    obtenerTodoCursoUsuarioService,
    modificarCursoService,  
    eliminarCursoService,  
    holaCursoService} = require('../services/cursoService');

/************************************************************************************
 * 
 * 
 *   OPERACIONES PLAYLIST
 * 
 * 
 ************************************************************************************/

exports.crearCursoController = async (req, res) => {
    // Implementación para registrar un nuevo usuario
    // Llamada de funcion registrarUsuarioService
    
    crearCursoService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Se ha creado playlist exitosamente!!!","datosPlaylist":result});
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al generar playlist!!!","errorPlaylist":err.message});
            return  res.json(err.message);
        }
    )

};

exports.obtenerCursoController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    obtenerCursoService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Lista de playlist obtenida exitosamente","datosPlaylist":result});
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener todas las playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};

exports.obtenerTodoCursoUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    obtenerTodoCursoUsuarioService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Lista de playlist obtenida exitosamente","datosPlaylist":result});
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener todas las playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};

exports.modificarCursoController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    modificarCursoService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Playlist modificado exitosamente!!","datosPlaylist":result});
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al modificar playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};

exports.eliminarCursoController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    eliminarCursoService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Playlist eliminado exitosamente","datosPlaylist":result});
        const {status,data} = result;
        return res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al eliminar playlist!!!","errorPlaylist":err.message});
            return res.json(err.message);
        }
    )
};



/***************************************************************************************************** */
// Controladores para hola mundo
exports.holaCursoController = async (req, res) => {
    // Implementación para obtener un hola mundo
    holaCursoService().then((result)=>{
        return res.status(200).json({status:200,mensaje:"Hola playlist correctamente"})    
    })
    .catch((error)=>{
        return res.status(400).json({status:400,mensaje:"Error al obtener hola playlist"})
    })  
};

