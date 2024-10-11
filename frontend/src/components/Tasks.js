import React, { useState } from "react";
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

const Tasks = () => {
  // Lista quemada de tareas
  const [tareas, setTareas] = useState([
    {
      id: 1,
      nombre: "Tarea de Matemáticas",
      descripcion: "Resolver problemas de álgebra",
      fechaEntrega: "2024-10-15",
    },
    {
      id: 2,
      nombre: "Proyecto de Historia",
      descripcion: "Ensayo sobre la Revolución Francesa",
      fechaEntrega: "2024-10-20",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [archivo, setArchivo] = useState(null);

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

  const handleCargarDocumento = () => {
    if (archivo) {
      // Aquí iría el código para cargar el archivo (subirlo a un servidor o procesarlo)
      alert("Archivo cargado con éxito: " + archivo.name);
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
            key={tarea.id}
            sx={{ backgroundColor: "#e3f2fd", borderRadius: 2, mb: 2 }}
            button
            onClick={() => handleOpen(tarea)}
          >
            <ListItemText
              primary={tarea.nombre}
              secondary={`Fecha de Entrega: ${tarea.fechaEntrega}`}
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
            <Typography variant="h6">{selectedTarea.nombre}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {selectedTarea.descripcion}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Fecha de Entrega: {selectedTarea.fechaEntrega}
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
              onClick={handleCargarDocumento}
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
