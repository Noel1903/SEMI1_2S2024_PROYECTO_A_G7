import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

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

        {/* Botón para ir a la página de inicio */}
        <Button color="inherit" component={Link} to="/home">
          Inicio
        </Button>

        {/* Botones de navegación */}
        <Button color="inherit" component={Link} to="/schedules">
          Horarios
        </Button>
        <Button color="inherit" component={Link} to="/reminders">
          Recordatorios
        </Button>
        <Button color="inherit" component={Link} to="/tasks">
          Tareas
        </Button>

        {/* Notificaciones */}
        <IconButton color="inherit" onClick={handleMenuClick}>
          <NotificationsIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Notificación 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Notificación 2</MenuItem>
        </Menu>

        {/* Ver perfil */}
        <Button color="inherit" component={Link} to="/perfil">
          Ver Perfil
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
