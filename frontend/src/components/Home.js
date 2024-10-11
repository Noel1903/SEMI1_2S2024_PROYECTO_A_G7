import React from "react";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import BookIcon from "@mui/icons-material/Book"; // Ícono de libro para cursos
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Ícono de reloj para la hora
import NotificationsIcon from "@mui/icons-material/Notifications"; // Ícono de notificación para los recordatorios

const Home = () => {
  // Lista de cursos
  const cursos = [
    { nombre: "Curso de React" },
    { nombre: "Curso de Python" },
    { nombre: "Curso de AWS" },
    { nombre: "Curso de Diseño UX/UI" },
  ];

  // Lista de recordatorios
  const recordatorios = [
    {
      nombre: "Entrega de Proyecto",
      descripcion: "Finalizar y entregar el proyecto de React.",
      fecha: "10 Octubre 2024",
      hora: "15:00",
    },
    {
      nombre: "Reunión con equipo",
      descripcion: "Reunión para discutir avances del sprint.",
      fecha: "11 Octubre 2024",
      hora: "10:00",
    },
    {
      nombre: "Examen de AWS",
      descripcion: "Prepararse para el examen de certificación AWS.",
      fecha: "12 Octubre 2024",
      hora: "09:00",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido a tu panel de gestión
      </Typography>
      <Typography variant="body1" gutterBottom>
        Aquí puedes gestionar tus tareas, horarios y recordatorios.
      </Typography>

      {/* Lista de Cursos */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Cursos Asignados
      </Typography>
      <List>
        {cursos.map((curso, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <BookIcon /> {/* Ícono que representa el curso */}
            </ListItemIcon>
            <ListItemText primary={curso.nombre} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 4 }} />

      {/* Lista de Recordatorios */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Recordatorios
      </Typography>
      <List>
        {recordatorios.map((recordatorio, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemIcon>
              <NotificationsIcon /> {/* Ícono que representa el recordatorio */}
            </ListItemIcon>
            <ListItemText
              primary={recordatorio.nombre}
              secondary={
                <>
                  <Typography variant="body2" component="span">
                    {recordatorio.descripcion}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <AccessTimeIcon sx={{ mr: 1 }} /> {/* Ícono que representa la hora */}
                    <Typography variant="body2">
                      {recordatorio.fecha} - {recordatorio.hora}
                    </Typography>
                  </Box>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Home;
