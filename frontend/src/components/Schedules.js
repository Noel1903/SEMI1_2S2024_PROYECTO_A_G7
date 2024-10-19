import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Schedules = () => {
  const [horarios, setHorarios] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [nuevoHorario, setNuevoHorario] = useState({
    id_course: "",
    inicio: "",
    fin: "",
  });
  const id_user = localStorage.getItem("id_user");

  // Obtener horarios y cursos desde el backend
  useEffect(() => {
    const getHorarios = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/get_schedules_by_user",
          { id_user }
        );
        const horariosConNombre = await Promise.all(
          response.data.map(async (horario) => {
            const { data: curso } = await axios.post(
              "http://localhost:5000/get_course",
              { id_course: horario.id_course }
            );
            return { ...horario, course_name: curso.name };
          })
        );
        setHorarios(horariosConNombre);
      } catch (error) {
        console.error("Error al obtener horarios:", error);
      }
    };

    const getCursos = async () => {
      const response = await axios.get("http://localhost:5000/get_all_courses");
      setCursos(response.data);
    };

    getHorarios();
    getCursos();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setNuevoHorario({ id_course: "", inicio: "", fin: "" });
  };

  const handleChange = (e) =>
    setNuevoHorario({ ...nuevoHorario, [e.target.name]: e.target.value });

  const handleCrearHorario = async () => {
    const idUsuario = localStorage.getItem("id_user");

    const data = {
      datetime_start: nuevoHorario.inicio,
      datetime_end: nuevoHorario.fin,
      id_course: nuevoHorario.id_course,
      id_user: idUsuario,
    };

    if (isEditing) {
      await axios.put("http://localhost:5000/update_schedule", {
        id_schedule: editId,
        ...data,
      });
      setHorarios((prev) =>
        prev.map((h) => (h.id_schedule === editId ? { ...h, ...data } : h))
      );
    } else {
      await axios.post("http://localhost:5000/create_schedule", data);
      const { data: curso } = await axios.post(
        "http://localhost:5000/get_course",
        { id_course: nuevoHorario.id_course }
      );
      setHorarios([
        ...horarios,
        { ...data, id_schedule: uuidv4(), course_name: curso.name },
      ]);
    }
    handleClose();
  };

  const handleEditar = (id_schedule) => {
    const horario = horarios.find((h) => h.id_schedule === id_schedule);
    setNuevoHorario({
      id_course: horario.id_course,
      inicio: horario.datetime_start,
      fin: horario.datetime_end,
    });
    setIsEditing(true);
    setEditId(id_schedule);
    handleOpen();
  };

  const handleEliminar = async (id_schedule) => {
    await axios.delete("http://localhost:5000/delete_schedule", {
      data: { id_schedule },
    });
    alert("Horario eliminado correctamente!");
    setHorarios((prev) => prev.filter((h) => h.id_schedule !== id_schedule));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Horarios
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 3 }}
      >
        Crear Horario
      </Button>

      <Grid container spacing={3}>
        {horarios.map((horario) => (
          <Grid item xs={12} md={6} lg={4} key={horario.id_schedule}>
            <Card sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {horario.course_name}
                </Typography>
                <Typography color="textSecondary">
                  Inicio: {horario.datetime_start}
                </Typography>
                <Typography color="textSecondary">
                  Fin: {horario.datetime_end}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEditar(horario.id_schedule)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleEliminar(horario.id_schedule)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEditing ? "Editar Horario" : "Crear Horario"}
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Selecciona un curso"
            name="id_course"
            value={nuevoHorario.id_course}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {cursos.map((curso) => (
              <MenuItem key={curso.id_course} value={curso.id_course}>
                {curso.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Hora de Inicio"
            type="time"
            name="inicio"
            value={nuevoHorario.inicio}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hora de Fin"
            type="time"
            name="fin"
            value={nuevoHorario.fin}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={handleCrearHorario}
            variant="contained"
            color="primary"
          >
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Schedules;
