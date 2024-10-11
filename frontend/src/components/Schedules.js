import React, { useState } from "react";
import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule"; // Ícono de reloj para los horarios
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos para los horarios

const Schedules = () => {
  // Lista de cursos disponibles
  const cursosDisponibles = [
    { id: 1, nombre: "Curso de React" },
    { id: 2, nombre: "Curso de Python" },
    { id: 3, nombre: "Curso de AWS" },
    { id: 4, nombre: "Curso de Diseño UX/UI" },
  ];

  // Lista quemada de horarios
  const [horarios, setHorarios] = useState([
    {
      id: uuidv4(),
      curso: "Curso de React",
      inicio: "08:00",
      fin: "10:00",
      color: "#f28b82", // Color diferente para cada horario
    },
    {
      id: uuidv4(),
      curso: "Curso de Python",
      inicio: "11:00",
      fin: "13:00",
      color: "#fbbc04",
    },
    {
      id: uuidv4(),
      curso: "Curso de AWS",
      inicio: "14:00",
      fin: "16:00",
      color: "#a7ffeb",
    },
  ]);

  const [open, setOpen] = useState(false); // Estado para controlar el diálogo
  const [nuevoHorario, setNuevoHorario] = useState({
    curso: "",
    inicio: "",
    fin: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Manejadores para los cambios en el formulario de creación de horario
  const handleChange = (e) => {
    setNuevoHorario({
      ...nuevoHorario,
      [e.target.name]: e.target.value,
    });
  };

  const handleCrearHorario = () => {
    const color = `#${Math.floor(Math.random()*16777215).toString(16)}`; // Generar color aleatorio
    setHorarios([...horarios, { ...nuevoHorario, id: uuidv4(), color }]);
    handleClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Horarios
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Crear Horario
      </Button>

      {/* Lista de Horarios */}
      <List sx={{ mt: 4 }}>
        {horarios.map((horario) => (
          <ListItem key={horario.id} sx={{ backgroundColor: horario.color, borderRadius: 2, mb: 2 }}>
            <ListItemIcon>
              <ScheduleIcon /> {/* Ícono de reloj */}
            </ListItemIcon>
            <ListItemText
              primary={horario.curso}
              secondary={`Inicio: ${horario.inicio} - Fin: ${horario.fin}`}
            />
          </ListItem>
        ))}
      </List>

      {/* Ventana emergente para crear un nuevo horario */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Nuevo Horario</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Selecciona un curso"
            name="curso"
            value={nuevoHorario.curso}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {cursosDisponibles.map((curso) => (
              <MenuItem key={curso.id} value={curso.nombre}>
                {curso.nombre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Hora de Inicio"
            type="time"
            name="inicio"
            value={nuevoHorario.inicio}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Hora de Fin"
            type="time"
            name="fin"
            value={nuevoHorario.fin}
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
          <Button onClick={handleCrearHorario} variant="contained" color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Schedules;
