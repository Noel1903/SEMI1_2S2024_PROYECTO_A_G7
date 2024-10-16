import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container, Box, Typography, TextField, Button, 
  List, ListItem, ListItemText, ListItemSecondaryAction, 
  IconButton, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    url_img: null, // Usaremos un objeto File aquí
    role: "user"
  });
  const [editingUser, setEditingUser] = useState(null); // Para manejar la edición

  const { username, email, password, role } = formData;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      url_img: e.target.files[0], // Guardamos el archivo seleccionado
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("username", formData.username);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("url_img", formData.url_img);
      form.append("role", formData.role);

      if (editingUser) {
        await axios.put(`http://localhost:5000/update_user`,
            {
                id_user: editingUser.id_user,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                url_img: formData.url_img,
                role: formData.role
            }
        );
        alert("Usuario actualizado correctamente!");
      } else {
        await axios.post("http://localhost:5000/create_user", form);
        alert("Usuario creado correctamente!");
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error("Error al crear/actualizar usuario:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      url_img: null, // No cargamos la imagen aquí
      role: user.role,
    });
  };

  const handleDeleteUser = async (id_user) => {
    try {
      await axios.delete(`http://localhost:5000/delete_user`,
        { data: { id_user } }
      );
      alert("Usuario eliminado correctamente!");
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      url_img: null,
      role: "user",
    });
    setEditingUser(null);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Administracion de Usuarios
        </Typography>

        <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required={!editingUser} // No es obligatorio al editar
            value={password}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              name="role"
              value={role}
              onChange={handleFormChange}
            >
              <MenuItem value="user">user</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" component="label" sx={{ mb: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          <Button type="submit" variant="contained" color="primary">
            {editingUser ? "Update User" : "Create User"}
          </Button>
          {editingUser && (
            <Button onClick={resetForm} sx={{ ml: 2 }}>
              Cancelar
            </Button>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Usuarios Existentes
          </Typography>
          <List>
            {users.map((user) => (
              <ListItem key={user.id_user}>
                <ListItemText
                  primary={`${user.username} (${user.role})`}
                  secondary={`Email: ${user.email}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditUser(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(user.id_user)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default UsersAdmin;
