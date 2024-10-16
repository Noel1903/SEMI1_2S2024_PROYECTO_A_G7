// HomeAdmin.jsx
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Container, List, ListItem, ListItemAvatar, Avatar, ListItemText, CircularProgress } from "@mui/material";
import { Notifications as NotificationsIcon, Logout as LogoutIcon } from "@mui/icons-material";
import axios from "axios";

const HomeAdmin = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Obtener las notificaciones del backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_notifications");
        setNotifications(response.data);
      } catch (err) {
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Renderiza la lista de notificaciones
  const renderNotifications = () =>
    notifications.map((notification, index) => (
      <ListItem key={index} divider>
        <ListItemAvatar>
          <Avatar>{notification.type[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={notification.title}
          secondary={notification.message}
        />
      </ListItem>
    ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      
      {/* Contenido principal */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Notificaciones
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : notifications.length === 0 ? (
          <Typography>No existen notificaciones por ahora.</Typography>
        ) : (
          <List>{renderNotifications()}</List>
        )}
      </Container>
    </Box>
  );
};

export default HomeAdmin;
