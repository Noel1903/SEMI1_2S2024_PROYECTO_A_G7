import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Typography, List, Card, CardContent, 
  CardActions, Button, Divider, Grid
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Home = () => {
  const [cursos, setCursos] = useState([]); // Estado para cursos
  const [recordatorios, setRecordatorios] = useState([]); // Estado para recordatorios
  const id_user = localStorage.getItem("id_user"); // Obtener id_user de localStorage

  useEffect(() => {
    fetchCursos(); // Cargar cursos
    fetchRecordatorios(); // Cargar recordatorios
  }, []);

  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://balanceado-semi1-502fe059c57d10ca.elb.us-east-1.amazonaws.com/get_all_courses");
      setCursos(response.data);
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  };

  const fetchRecordatorios = async () => {
    try {
      const response = await axios.post("http://balanceado-semi1-502fe059c57d10ca.elb.us-east-1.amazonaws.com/get_reminders_user", { id_user });
      setRecordatorios(response.data);
    } catch (error) {
      console.error("Error al obtener recordatorios:", error);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
        Bienvenido a tu Panel de Gestión
      </Typography>
      <Typography variant="body1" align="center" gutterBottom sx={{ mb: 4 }}>
        Aquí puedes gestionar tus tareas, horarios y recordatorios.
      </Typography>

      <Grid container spacing={4}>
        {/* Sección de Cursos */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2, color: "#2e7d32" }}>
            Cursos Existentes
          </Typography>
          <List>
            {cursos.length > 0 ? (
              cursos.map((curso, index) => (
                <Card key={index} sx={{ mb: 2, backgroundColor: "#e8f5e9" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
                      <BookIcon sx={{ mr: 1, color: "#4caf50" }} />
                      {curso.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Ver más
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <Typography variant="body2">No tienes cursos asignados.</Typography>
            )}
          </List>
        </Grid>

        {/* Sección de Recordatorios */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2, color: "#1976d2" }}>
            Recordatorios
          </Typography>
          <List>
            {recordatorios.length > 0 ? (
              recordatorios.map((recordatorio, index) => (
                <Card key={index} sx={{ mb: 2, backgroundColor: "#e3f2fd" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
                      <NotificationsIcon sx={{ mr: 1, color: "#2196f3" }} />
                      {recordatorio.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {recordatorio.description}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <AccessTimeIcon sx={{ mr: 1, color: "#757575" }} />
                      <Typography variant="body2">
                        {recordatorio.date} - {recordatorio.hour}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2">No tienes recordatorios pendientes.</Typography>
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
