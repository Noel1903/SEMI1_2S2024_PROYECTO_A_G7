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
module.exports = {uploadImage,deleteImage,getAllImageS3};


