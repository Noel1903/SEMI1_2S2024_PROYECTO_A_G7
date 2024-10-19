import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Box, TextField, Button, Typography, Container, Stack, Avatar 
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material"; // Ícono de Google
import axios from "axios";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
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
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async() => {
    try{
      const response = await axios.post("https://eg1oxolsnk.execute-api.us-east-1.amazonaws.com/produccion/registro_cognito",
        {
          email: email,
          password: password,
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.statusCode);
      if (response.data.statusCode === 200) {
        alert("Registro de usuario con cognito exitoso!");
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", "user");
        if (selectedImage) formData.append("url_img", selectedImage);

        const resp =await axios.post("http://localhost:5000/create_user", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(resp);
        if (resp.status === 200) {
          alert("Registro de usuario exitoso!");
          navigate("/login");
        } else {
          setError("Registro fallido. Por favor, inténtelo de nuevo.");
        }
      } else {
        if (response.data.message ===  "User already exists") {
          setError("El correo ya está registrado.");
        }else if (response.data.message === "Password did not conform with policy: Password not long enough"){
          setError("La contraseña debe tener al menos 6 carácteres.");
        }else{
          setError("Registro fallido. Por favor, inténtelo de nuevo.");
        }
      }
    } catch (error) {
      console.error("Error en registro con cognito:", error);
      setError("Registro fallido. Por favor, inténtelo de nuevo.");
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

            <Button
              variant="contained"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={handleGoogleRegister}
              sx={{
                backgroundColor: "#4285F4",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#357ae8",
                },
              }}
            >
              Registrarse con Cognito
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
