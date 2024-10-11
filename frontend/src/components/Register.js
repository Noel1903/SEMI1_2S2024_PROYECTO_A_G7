import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, TextField, Button, Typography, Container, Stack, Avatar } from "@mui/material";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Manejar la carga de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Crear la URL para previsualizar la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
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
        <Box component="form" sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
            />

            {/* Cargar imagen */}
            <Button
              variant="outlined"
              component="label"
              color="primary"
              fullWidth
            >
              Upload Profile Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {/* Mostrar previsualización de la imagen */}
            {previewImage && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Avatar
                  alt="Preview Image"
                  src={previewImage}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
            )}

            <Button variant="contained" color="primary" fullWidth>
              Register
            </Button>
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
