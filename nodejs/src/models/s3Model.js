function uploadImage(folderName,fileImage){
    return{
        Bucket: 'proyecto-semi1-a-g7',
        Key: `${folderName}/${fileImage.originalname}`,
        Body: fileImage.buffer,
        ContentType:fileImage.mimetype
    };
}


function deleteImage(folderName,fileName){
    return{
        Bucket: 'proyecto-semi1-a-g7',
        Key: `${folderName}/${fileName}`
    };
}

function getAllImageS3(folderName){
    return{
        Bucket: 'proyecto-semi1-a-g7',
        Prefix: folderName
    };
}

// Función para subir archivos a S3 usando AWS SDK v3
function uploadFile (file){

    // Configurar los parámetros para la subida a S3
    return{
        Bucket: "proyecto-semi1-a-g7",  // Reemplaza con tu bucket de S3
        Key: `${file.originalname}`,  // Nombre del archivo en S3
        Body: file.buffer,  // Contenido del archivo
        ContentType: file.mimetype  // Tipo de contenido del archivo
    };
  
}

function deleteFile(fileName){
    return{
        Bucket: 'proyecto-semi1-a-g7',
        Key: `documentos_tareas/${fileName}`
    };
}

  
module.exports = {uploadImage,deleteImage,getAllImageS3,uploadFile,deleteFile};


