import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Container, Stack, Avatar } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Para redireccionar al login después del registro

  // Manejar la carga de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar el registro
  const handleRegister = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "user");
    if (selectedImage) formData.append("url_img", selectedImage);

    try {
      const response = await axios.post("http://localhost:5000/create_user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("Registration successful!"); // Notificación
        navigate("/login"); // Redirigir al login
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
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
          Create an Account
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <Button variant="outlined" component="label" color="primary" fullWidth>
              Upload Profile Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            {previewImage && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Avatar alt="Preview Image" src={previewImage} sx={{ width: 100, height: 100 }} />
              </Box>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Stack>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              Login here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
