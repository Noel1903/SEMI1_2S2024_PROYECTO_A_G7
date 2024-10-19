import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Box, TextField, Button, Typography, Container, Stack, Dialog, DialogActions, 
  DialogContent, DialogTitle 
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material"; // Icono de Google
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

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
        localStorage.setItem("id_user", response.data.id_user);
        alert("Usuario logueado correctamente");
        const role = response.data.role === "admin" ? "admin" : "user";
        localStorage.setItem("role", role);
        navigate(role === "admin" ? "/homeAdmin" : "/home");
      }
    } catch (err) {
      setError("Correo o contraseña incorrecta");
    } finally {
      setLoading(false);
    }
  };

  const openCamera = async () => {
    setCameraOpen(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const takePhoto = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const imageData = canvas.toDataURL("image/png");
    handleFaceRecognition(imageData);
    handleCloseCamera();
  };

  const handleFaceRecognition = async (imageData) => {
    const form = new FormData();
    form.append("image", dataURLtoFile(imageData, "face.png"));

    try {
      const response = await axios.post("http://localhost:5000/get_rekognition", form);

      if (response.status === 200) {
        const { id_user, message, role } = response.data;
        alert(message);
        localStorage.setItem("id_user", id_user);
        localStorage.setItem("role", "admin");
        navigate("/homeAdmin");
      }
    } catch (err) {
      console.error("Error en reconocimiento facial:", err);
      setError("Error en reconocimiento facial.");
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleCloseCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setCameraOpen(false);
  };

  const handleGoogleLogin = async() => {
    try{
      const response = await axios.post("https://eg1oxolsnk.execute-api.us-east-1.amazonaws.com/produccion/cognito_login",
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.data.message ==="Login successful") {
        const resp = await axios.post("http://localhost:5000/login_user", {
          email,
          password,
        });
  
        if (resp.status === 200) {
          localStorage.setItem("id_user", resp.data.id_user);
          alert("Usuario logueado correctamente");
          const role = resp.data.role === "admin" ? "admin" : "user";
          localStorage.setItem("role", role);
          navigate(role === "admin" ? "/homeAdmin" : "/home");
        }
        
      }
      
      
    }
    catch (error) {
      alert("Error en Login con cognito, falta confirmar correo o datos incorrectos");


      console.error('Error en  Login con cognito:', error);
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
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button variant="outlined" color="secondary" fullWidth onClick={openCamera}>
              Facial Recognition
            </Button>
            <Button 
              variant="contained" 
              fullWidth 
              startIcon={<GoogleIcon />} 
              onClick={handleGoogleLogin} 
              sx={{
                backgroundColor: "#4285F4",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#357ae8",
                },
              }}
            >
              Ingresar con tu cuenta de correo
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

      <Dialog open={cameraOpen} onClose={handleCloseCamera}>
        <DialogTitle>Facial Recognition</DialogTitle>
        <DialogContent>
          <video ref={videoRef} autoPlay style={{ width: "100%" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={takePhoto} color="primary">
            Take Photo
          </Button>
          <Button onClick={handleCloseCamera} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Login;
