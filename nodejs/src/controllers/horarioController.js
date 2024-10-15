const {
    crearHorarioService,
    modificarHorarioService,
    eliminarHorarioService,
    holaHorarioService   
    } = require('../services/horarioService');

/************************************************************************************
 * 
 * 
 *   OPERACIONES horario
 * 
 * 
 ************************************************************************************/

exports.crearHorarioController = async (req, res) => {
    // Implementación para registrar un nuevo horario
    // Llamada de funcion registrarHorarioService
    
    crearHorarioService(req.body)
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

exports.modificarHorarioController = async (req, res) => {
    // Implementación para obtener un horario
    modificarHorarioService(req)
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

exports.eliminarHorarioController = async (req, res) => {
    // Implementación para obtener un horario
    eliminarHorarioService(req.body)
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
exports.holaHorarioController = async (req, res) => {
    // Implementación para obtener un hola mundo
    holaHorarioService().then((result)=>{
        return res.status(200).json({status:200,mensaje:"Hola horario correctamente",datosPlaylist:result})    
    })
    .catch((error)=>{
        return res.status(400).json({status:400,mensaje:"Error al obtener hola horario",errorPlaylist:error.message})
    })  
};

