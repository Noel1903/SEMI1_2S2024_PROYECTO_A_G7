import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description"; // Ícono para la descripción

const Reminders = () => {
  // Lista quemada de recordatorios
  const [recordatorios, setRecordatorios] = useState([
    {
      id: 1,
      nombre: "Entrega de Proyecto",
      descripcion: "Subir proyecto final a la plataforma",
      fecha: "2024-10-12",
      hora: "18:00",
    },
    {
      id: 2,
      nombre: "Reunión con el equipo",
      descripcion: "Revisión de avances",
      fecha: "2024-10-13",
      hora: "09:00",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [nuevoRecordatorio, setNuevoRecordatorio] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    hora: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setNuevoRecordatorio({
      nombre: "",
      descripcion: "",
      fecha: "",
      hora: "",
    });
  };

  const handleChange = (e) => {
    setNuevoRecordatorio({
      ...nuevoRecordatorio,
      [e.target.name]: e.target.value,
    });
  };

  const handleCrearRecordatorio = () => {
    if (isEditing) {
      setRecordatorios(
        recordatorios.map((recordatorio) =>
          recordatorio.id === editId ? { ...nuevoRecordatorio, id: editId } : recordatorio
        )
      );
    } else {
      setRecordatorios([
        ...recordatorios,
        { ...nuevoRecordatorio, id: recordatorios.length + 1 },
      ]);
    }
    handleClose();
  };

  const handleEditar = (id) => {
    const recordatorio = recordatorios.find((rec) => rec.id === id);
    setNuevoRecordatorio({
      nombre: recordatorio.nombre,
      descripcion: recordatorio.descripcion,
      fecha: recordatorio.fecha,
      hora: recordatorio.hora,
    });
    setIsEditing(true);
    setEditId(id);
    handleOpen();
  };

  const handleEliminar = (id) => {
    setRecordatorios(recordatorios.filter((recordatorio) => recordatorio.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Recordatorios
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Crear Recordatorio
      </Button>

      {/* Lista de Recordatorios */}
      <List sx={{ mt: 4 }}>
        {recordatorios.map((recordatorio) => (
          <ListItem
            key={recordatorio.id}
            sx={{ backgroundColor: "#f0f4c3", borderRadius: 2, mb: 2 }}
          >
            <ListItemIcon>
              <ScheduleIcon /> {/* Ícono para hora */}
            </ListItemIcon>
            <ListItemText
              primary={recordatorio.nombre}
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    {`Fecha: ${recordatorio.fecha}, Hora: ${recordatorio.hora}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <DescriptionIcon sx={{ fontSize: "small" }} />{" "}
                    {recordatorio.descripcion}
                  </Typography>
                </>
              }
            />
            {/* Botones para editar y eliminar */}
            <IconButton edge="end" onClick={() => handleEditar(recordatorio.id)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleEliminar(recordatorio.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Ventana emergente para crear o editar un recordatorio */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEditing ? "Editar Recordatorio" : "Crear Nuevo Recordatorio"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre del Recordatorio"
            name="nombre"
            value={nuevoRecordatorio.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="descripcion"
            value={nuevoRecordatorio.descripcion}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha"
            type="date"
            name="fecha"
            value={nuevoRecordatorio.fecha}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Hora"
            type="time"
            name="hora"
            value={nuevoRecordatorio.hora}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleCrearRecordatorio} variant="contained" color="primary">
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reminders;
