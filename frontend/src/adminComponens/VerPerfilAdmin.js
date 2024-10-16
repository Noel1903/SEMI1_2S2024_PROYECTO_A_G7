import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container, Box, Typography, Avatar, Button, 
  IconButton, Dialog, DialogActions, DialogContent, 
  DialogTitle
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const VerPerfilAdmin = () => {
  const [user, setUser] = useState(null); // Datos del usuario
  const [profileImg, setProfileImg] = useState(null); // Imagen cargada
  const [cameraOpen, setCameraOpen] = useState(false); // Control del diálogo de cámara
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.post("http://localhost:5000/get_user",
        { id_user: localStorage.getItem("id_user") }
      );
      setUser(response.data);
      setProfileImg(response.data.url_img); // Cargar la imagen de perfil existente
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImg(URL.createObjectURL(file)); // Previsualización local de la imagen
    uploadProfileImage(file);
  };

  const uploadProfileImage = async (file) => {
    const form = new FormData();
    form.append("profile_image", file);

    try {
      await axios.post("http://localhost:5000/upload_profile_image", form);
      alert("Imagen de perfil actualizada!");
      fetchUserProfile();
    } catch (error) {
      console.error("Error al subir imagen:", error);
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
    setProfileImg(imageData); // Guardar la foto tomada
    uploadProfileImage(dataURLtoFile(imageData, "photo.png"));
    handleCloseCamera();
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
    tracks.forEach((track) => track.stop()); // Detener la cámara
    setCameraOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("id_user");
    localStorage.removeItem("role");
    navigate("/login"); // Redirigir al login
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Mi Perfil
        </Typography>

        {profileImg ? (
          <Avatar
            src={profileImg}
            sx={{ width: 150, height: 150, margin: "auto" }}
          />
        ) : (
          <Avatar sx={{ width: 150, height: 150, margin: "auto" }} />
        )}

        <Typography variant="h6" sx={{ mt: 2 }}>
          {user ? user.username : "Cargando..."}
        </Typography>
        <Typography variant="body1">{user ? user.email : ""}</Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCameraIcon />}
            sx={{ mr: 2 }}
          >
            Subir Imagen
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <Button
            variant="outlined"
            startIcon={<PhotoCameraIcon />}
            onClick={openCamera}
          >
            Tomar Foto
          </Button>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ mt: 3 }}
        >
          Cerrar Sesión
        </Button>
      </Box>

      <Dialog open={cameraOpen} onClose={handleCloseCamera}>
        <DialogTitle>Tomar Foto</DialogTitle>
        <DialogContent>
          <video ref={videoRef} autoPlay style={{ width: "100%" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={takePhoto} color="primary">
            Tomar Foto
          </Button>
          <Button onClick={handleCloseCamera} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default VerPerfilAdmin;
