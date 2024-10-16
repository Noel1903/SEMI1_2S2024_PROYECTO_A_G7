import React, { useEffect, useState } from "react";
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
import axios from "axios";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description"; // Ícono para la descripción

const Reminders = () => {
  const [recordatorios, setRecordatorios] = useState([]);
  const [open, setOpen] = useState(false);
  const [nuevoRecordatorio, setNuevoRecordatorio] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    hora: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const id_user = localStorage.getItem("id_user"); // Obtener ID del usuario

  useEffect(() => {
    fetchRecordatorios(); // Cargar recordatorios al inicio
  }, []);

  // Obtener recordatorios del usuario
  const fetchRecordatorios = async () => {
    try {
      const response = await axios.post("http://localhost:5000/get_reminders_user", {
        id_user,
      });
      setRecordatorios(response.data);
    } catch (error) {
      console.error("Error al obtener recordatorios:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setNuevoRecordatorio({ nombre: "", descripcion: "", fecha: "", hora: "" });
  };

  const handleChange = (e) => {
    setNuevoRecordatorio({ ...nuevoRecordatorio, [e.target.name]: e.target.value });
  };

  const handleCrearRecordatorio = async () => {
    try {
      if (isEditing) {
        await axios.put("http://localhost:5000/modify_reminder", {
          id_reminder: editId,
          name: nuevoRecordatorio.nombre,
          description: nuevoRecordatorio.descripcion,
          date: nuevoRecordatorio.fecha,
          hour: nuevoRecordatorio.hora,
          id_user: id_user,
        });
      } else {
        await axios.post("http://localhost:5000/create_reminder", {
          name: nuevoRecordatorio.nombre,
          description: nuevoRecordatorio.descripcion,
          date: nuevoRecordatorio.fecha,
          hour: nuevoRecordatorio.hora,
          id_user: id_user,
        });
      }
      fetchRecordatorios(); // Actualizar la lista
      handleClose();
    } catch (error) {
      console.error("Error al crear/modificar recordatorio:", error);
    }
  };

  const handleEditar = (id_reminder) => {
    const recordatorio = recordatorios.find((rec) => rec.id_reminder === id_reminder);
    setNuevoRecordatorio({
      nombre: recordatorio.nombre,
      descripcion: recordatorio.descripcion,
      fecha: recordatorio.fecha,
      hora: recordatorio.hora,
    });
    setIsEditing(true);
    setEditId(id_reminder);
    handleOpen();
  };

  const handleEliminar = async (id_reminder) => {
    try {
      await axios.delete("http://localhost:5000/delete_reminder", {data: {id_reminder} });
      alert("Recordatorio eliminado correctamente.");
      fetchRecordatorios(); // Actualizar la lista
    } catch (error) {
      console.error("Error al eliminar recordatorio:", error);
    }
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
            key={recordatorio.id_reminder}
            sx={{ backgroundColor: "#f0f4c3", borderRadius: 2, mb: 2 }}
          >
            <ListItemIcon>
              <ScheduleIcon /> {/* Ícono para hora */}
            </ListItemIcon>
            <ListItemText
              primary={recordatorio.name}
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    {`Fecha: ${recordatorio.date}, Hora: ${recordatorio.hour}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <DescriptionIcon sx={{ fontSize: "small" }} />{" "}
                    {recordatorio.description}
                  </Typography>
                </>
              }
            />
            {/* Botones para editar y eliminar */}
            <IconButton edge="end" onClick={() => handleEditar(recordatorio.id_reminder)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleEliminar(recordatorio.id_reminder)}>
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
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hora"
            type="time"
            name="hora"
            value={nuevoRecordatorio.hora}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
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
