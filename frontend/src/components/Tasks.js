import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios"; // Asegúrate de importar axios

const Tasks = () => {
  // Lista de tareas
  const [tareas, setTareas] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [archivo, setArchivo] = useState(null);

  // Función para obtener las tareas desde el servidor
  const fetchTareas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_tasks");
      setTareas(response.data); // Asigna la respuesta a la lista de tareas
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  // UseEffect para cargar las tareas al montar el componente
  useEffect(() => {
    fetchTareas(); // Llama a la función para obtener las tareas
  }, []);

  const handleOpen = (tarea) => {
    setSelectedTarea(tarea);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTarea(null);
    setArchivo(null);
  };

  const handleArchivoChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handlePrevisualizarDocumento = () => {
    if (archivo) {
      const url = URL.createObjectURL(archivo);
      window.open(url, "_blank"); // Abrir documento en nueva ventana
    }
  };

  const handleUploadTask = async () => {
    if (archivo && selectedTarea) {
      const formData = new FormData();
      const id_user = localStorage.getItem("id_user"); // Obtiene el id_user del localStorage
      const id_task = selectedTarea.id_task; // Obtiene el id_task de la tarea seleccionada

      formData.append("url_file", archivo); // Agrega el archivo al FormData
      formData.append("id_user", id_user); // Agrega el id_user
      formData.append("id_task", id_task); // Agrega el id_task

      try {
        const response = await axios.post("http://localhost:5000/upload_task", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Importante para subir archivos
          },
        });

        // Manejar la respuesta del servidor
        if (response.status === 200) {
          alert("Archivo subido con éxito.");
          handleClose(); // Cierra el diálogo
        }
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        alert("Error al subir el archivo.");
      }
    } else {
      alert("Por favor, selecciona un archivo antes de subir.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Tareas a Entregar
      </Typography>

      {/* Lista de Tareas */}
      <List sx={{ mt: 4 }}>
        {tareas.map((tarea) => (
          <ListItem
            key={tarea.id_task}
            sx={{ backgroundColor: "#e3f2fd", borderRadius: 2, mb: 2 }}
            button
            onClick={() => handleOpen(tarea)}
          >
            <ListItemText
              primary={tarea.name}
              secondary={`Fecha de Entrega: ${tarea.date}`} // Cambiado a 'date' según tu estructura
            />
            <IconButton edge="end">
              <AttachFileIcon /> {/* Ícono para indicar que se puede subir archivo */}
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Ventana emergente para ver los detalles de la tarea y subir archivo */}
      {selectedTarea && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Detalles de la Tarea</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedTarea.name}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {selectedTarea.description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Fecha de Entrega: {selectedTarea.date}
            </Typography>

            {/* Subir archivo */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1">Subir documento:</Typography>
              <input
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                type="file"
                onChange={handleArchivoChange}
              />
              {archivo && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Documento seleccionado: {archivo.name}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<UploadIcon />}
              onClick={handleUploadTask}
              disabled={!archivo}
            >
              Cargar Documento
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<VisibilityIcon />}
              onClick={handlePrevisualizarDocumento}
              disabled={!archivo}
            >
              Previsualizar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Tasks;
