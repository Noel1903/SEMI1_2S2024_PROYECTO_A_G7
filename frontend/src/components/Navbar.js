import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificaciones, setNotificaciones] = useState([]);

  // Obtener las notificaciones del usuario desde el backend
  const getNotificaciones = async () => {
    const idUsuario = localStorage.getItem("id_user");
    try {
      const response = await axios.post("http://localhost:5000/get_notifications_user", {
        id_user: idUsuario,
      });
      setNotificaciones(response.data);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    }
  };

  useEffect(() => {
    getNotificaciones();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Student Task Manager
        </Typography>

        <Button color="inherit" component={Link} to="/home">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/schedules">
          Horarios
        </Button>
        <Button color="inherit" component={Link} to="/reminders">
          Recordatorios
        </Button>
        <Button color="inherit" component={Link} to="/tasks">
          Tareas
        </Button>

        {/* Notificaciones con contador */}
        <IconButton color="inherit" onClick={handleMenuClick}>
          <Badge badgeContent={notificaciones.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {notificaciones.length > 0 ? (
            notificaciones.map((notificacion, index) => (
              <MenuItem key={index} onClick={handleMenuClose}>
                {notificacion.message}
              </MenuItem>
            ))
          ) : (
            <MenuItem onClick={handleMenuClose}>Sin notificaciones</MenuItem>
          )}
        </Menu>

        <Button color="inherit" component={Link} to="/perfil">
          Ver Perfil
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
