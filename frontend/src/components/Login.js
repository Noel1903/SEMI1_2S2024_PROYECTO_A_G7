import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Container, Stack } from "@mui/material";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState(""); // Cambié el estado a setEmail
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Para redirigir a otra página

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/login_user", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("id_user",response.data.id_user);
        alert("Usuarios Logueado correctamente");
        if (response.data.role === "admin") {
          localStorage.setItem("role", "admin");
          navigate("/homeAdmin"); // Redirigir a dashboard de admin
        }else{
          localStorage.setItem("role", "user");
          navigate("/home"); // Redirigir a dashboard o página principal
        }
        
      }
    } catch (err) {
      setError("Correo o contraseña incorrecta"); // Mensaje de error actualizado
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Student Task Manager
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualización correcta del estado
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button variant="outlined" color="secondary" fullWidth>
              Facial Recognition
            </Button>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Stack>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
