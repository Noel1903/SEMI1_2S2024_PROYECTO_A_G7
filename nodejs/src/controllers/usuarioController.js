const {registrarUsuarioService, 
    obtenerUsuarioService,
    obtenerTodoUsuarioService, 
    modificarUsuarioService, 
    eliminarUsuarioService, 
    holaUsuarioService, 
    loginUsuarioService,
    loginUsuarioFaceService,
    crearFacialUsuarioService
} = require('../services/usuarioService');

const multer = require('multer');
// Configuración de multer para manejar el form-data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
/************************************************************************************
 * 
 * 
 *   OPERACIONES USUARIO
 * 
 * 
 ************************************************************************************/

exports.registrarUsuarioController = async (req, res) => {
    // Implementación para registrar un nuevo usuario
    // Llamada de funcion registrarUsuarioService
    registrarUsuarioService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Se ha generado se ha registrado usuario exitosamente!!!","datosUsuario":result});
        //console.log(result);
        const {status,data} = result;
        return   res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al generar registrar usuario!!!","errorUsuario":err.message});
            return   res.status(500).json(err);
        }
    )

};
// controller para obtener un solo usuario
exports.obtenerUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    // en param tenia req.query --> req.body
    obtenerUsuarioService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Datos de usuario obtenido exitosamente","datosUsuario":result});
        const {status,data} = result;
        return  res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener usuario!!!","errorUsuario":err.message});
            return res.json({"mensaje":err});
        }
    )
};

// controllor para obtener todos los usuarios
exports.obtenerTodoUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    // en param tenia req.query --> req.body
    obtenerTodoUsuarioService()
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Datos de usuario obtenido exitosamente","datosUsuario":result});
        const {status,data} = result;
        return  res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener usuario!!!","errorUsuario":err.message});
            return res.json({"mensaje":err});
        }
    )
};

exports.modificarUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
   
    //******************** */
    modificarUsuarioService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Usuario modificado exitosamente","datosUsuario":result});
        const {status,data} = result;
        return  res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al modificar usuario!!!","errorUsuario":err.message});
            return   res.json(err);
            
        }
    )
};

exports.eliminarUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    eliminarUsuarioService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Usuario eliminado exitosamente","datosUsuario":result});
        const {status,data} = result;
        return  res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al eliminar usuario!!!","errorUsuario":err.message});
            return   res.json(err.message);
        }
    )
};


exports.loginUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    loginUsuarioService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Datos de usuario obtenido exitosamente","datosUsuario":result});
        const {status,data} = result;
        return  res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener usuario!!!","errorUsuario":err.message});
            return res.status(500).json({mensaje:err});
        }
    )
};


exports.loginUsuarioFaceController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    loginUsuarioFaceService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Datos de usuario obtenido exitosamente","datosUsuario":result});
        
        const {status,data} = result;
        return  res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener usuario!!!","errorUsuario":err.message});
            return res.status(500).json({error:`Error en servidor ${err}`});
        }
    )
};

exports.crearFacialUsuarioController = async (req, res) => {
    // Implementación para registrar un nuevo usuario
    // Llamada de funcion registrarUsuarioService
    crearFacialUsuarioService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Se ha generado se ha registrado usuario exitosamente!!!","datosUsuario":result});
        const {status,data} = result;
        return  res.status(status).json(data);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al generar registrar usuario!!!","errorUsuario":err.message});
            return res.json(err);
        }
    )

};
/***************************************************************************************************** */
// Controladores para hola mundo
exports.holaUsuarioController = async (req, res) => {
    // Implementación para obtener un hola mundo
    holaUsuarioService()
    .then((result)=>{
        const {status,data} = result;
        return  res.status(status).json(data);   
    })
    .catch((error)=>{
        return res.status(400).json({status:400,mensaje:"Error al obtener hola usuario",errorUsuario:error.message})
    })  
};

