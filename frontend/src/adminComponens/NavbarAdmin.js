import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NavbarAdmin = () => {

  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Student Task Manager
        </Typography>

        {/* Botón para ir a la página de inicio */}
        <Button color="inherit" component={Link} to="/homeAdmin">
          Inicio
        </Button>

        {/* Botones de navegación */}
        <Button color="inherit" component={Link} to="/coursesAdmin">
          Crear Cursos
        </Button>
        <Button color="inherit" component={Link} to="/taskAdmin">
          Crear Tareas
        </Button>
        <Button color="inherit" component={Link} to="/usersAdmin">
          Usuarios
        </Button>

        

        {/* Ver perfil */}
        <Button color="inherit" component={Link} to="/perfilAdmin">
          Ver Perfil
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAdmin;
