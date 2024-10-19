import React, { useState } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';
import { Button, TextField, Card, CardContent, Typography, Box, Grid, Alert } from '@mui/material';

// Configuración de AWS
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

const Functions = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [documentPath, setDocumentPath] = useState('');
  const [translateText, setTranslateText] = useState('');
  const [textractResult, setTextractResult] = useState('');
  const [pollyResponse, setPollyResponse] = useState('');

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Subir archivo a S3
  const uploadToS3 = async () => {
    if (!selectedFile) return alert('Por favor, selecciona un archivo.');

    const params = {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `documentos_tareas/${selectedFile.name}`,
      Body: selectedFile,
      ContentType: selectedFile.type,
    };

    try {
      await s3.upload(params).promise();
      const path = `documentos_tareas/${selectedFile.name}`;
      setDocumentPath(path);
      setUploadMessage('Archivo cargado exitosamente.');
    } catch (error) {
      console.error('Error al cargar:', error);
      setUploadMessage('Error al cargar el archivo.');
    }
  };

  // Consumir función de Translate
  const handleTranslate = async () => {
    try {
      const response = await axios.post(
        'https://de0qqod87e.execute-api.us-east-2.amazonaws.com/Prod/get_translate',
        { document: documentPath },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const translations = response.data.translations;

      // Formatear las traducciones
      const formattedTranslations = Object.entries(translations)
        .map(([lang, text]) => `${lang.toUpperCase()}: ${text}`)
        .join('\n\n');

      setTranslateText(`Original:\n${response.data.original}\n\nTraducciones:\n${formattedTranslations}`);
    } catch (error) {
      console.error('Error en Translate:', error);
    }
  };

  // Consumir función de Textract
  const handleTextract = async () => {
    try {
      const response = await axios.post(
        'https://de0qqod87e.execute-api.us-east-2.amazonaws.com/Prod/get_textract',
        { document: documentPath }
      );
      setTextractResult(response.data.Textract);
    } catch (error) {
      console.error('Error en Textract:', error);
    }
  };

  // Consumir función de Polly con base64
  const handlePolly = async () => {
    try {
      const response = await axios.post(
        'https://de0qqod87e.execute-api.us-east-2.amazonaws.com/Prod/get_polly',
        { document: documentPath }
      );

      // Aquí asumimos que response.data.audio es un string en base64
      const audioBase64 = response.data.audio;
      console.log(audioBase64);
      const audioSrc = `data:audio/mpeg;base64,${audioBase64}`;
      setPollyResponse(audioSrc);
    } catch (error) {
      console.error('Error en Polly:', error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Funciones de AWS
      </Typography>

      <Grid container spacing={4}>
        {/* Subir Archivo */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Subir Archivo a S3</Typography>
              <Box display="flex" alignItems="center" gap={2} mt={2}>
                <input type="file" onChange={handleFileChange} />
                <Button variant="contained" color="primary" onClick={uploadToS3}>
                  Cargar
                </Button>
              </Box>
              {uploadMessage && <Alert severity="info" sx={{ mt: 2 }}>{uploadMessage}</Alert>}
            </CardContent>
          </Card>
        </Grid>

        {/* Función Translate */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Función Translate</Typography>
              <Button variant="contained" color="success" onClick={handleTranslate} sx={{ mt: 2 }}>
                Traducir
              </Button>
              <TextField
                fullWidth
                multiline
                rows={10}
                value={translateText || ''}
                readOnly
                variant="outlined"
                sx={{ mt: 2 }}
                placeholder="Texto traducido aparecerá aquí"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Función Textract */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Función Textract</Typography>
              <Button variant="contained" color="warning" onClick={handleTextract} sx={{ mt: 2 }}>
                Extraer Texto
              </Button>
              <TextField
                fullWidth
                multiline
                rows={10}
                value={textractResult}
                readOnly
                variant="outlined"
                sx={{ mt: 2 }}
                placeholder="Texto extraído aparecerá aquí"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Función Polly */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Función Polly</Typography>
              <Button variant="contained" color="secondary" onClick={handlePolly} sx={{ mt: 2 }}>
                Generar Audio
              </Button>
              {pollyResponse && (
                <audio controls preload="auto" style={{ marginTop: '16px', width: '100%' }}>
                  <source src={pollyResponse} type="audio/mpeg" />
                  Tu navegador no soporta la reproducción de audio.
                </audio>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Functions;
