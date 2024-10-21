import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Avatar, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Obtener la información del perfil desde el backend
  const getPerfil = async () => {
    const idUsuario = localStorage.getItem("id_user");
    try {
      const response = await axios.post("http://balanceado-semi1-502fe059c57d10ca.elb.us-east-1.amazonaws.com/get_user", {
        id_user: idUsuario,
      });
      setUsuario(response.data);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPerfil();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id_user"); // Elimina el id del usuario del localStorage
    navigate("/login"); // Redirige al login
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Avatar
        src={usuario?.url_img || ""}
        alt="Avatar"
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        {usuario?.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Email: {usuario?.email}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Usuario: {usuario?.username}
      </Typography>

      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={handleLogout}
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
};

export default Perfil;
