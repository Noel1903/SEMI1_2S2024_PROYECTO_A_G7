import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container, Box, Typography, TextField, Button, 
  List, ListItem, ListItemText, ListItemSecondaryAction, 
  IconButton, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    hour: "",
    id_course: "" // Verificamos que esté vacío al inicio
  });

  const { name, description, date, hour, id_course } = formData;

  useEffect(() => {
    fetchTasks();
    fetchCourses(); // Cargar los cursos al montar el componente
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://balanceado-semi1-502fe059c57d10ca.elb.us-east-1.amazonaws.com/get_tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://balanceado-semi1-502fe059c57d10ca.elb.us-east-1.amazonaws.com/get_all_courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    console.log("Selected Course ID:", value); // Verificar si el valor es el correcto
    setFormData((prevData) => ({
      ...prevData,
      id_course: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://balanceado-semi1-502fe059c57d10ca.elb.us-east-1.amazonaws.com/create_task", formData);
      alert("Tarea creada correctamente!");
      setFormData({
        name: "",
        description: "",
        date: "",
        hour: "",
        id_course: ""
      });
      fetchTasks();
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  const handleDeleteTask = async (id_task) => {
    try {
      await axios.delete(`http://balanceado-semi1-502fe059c57d10ca.elb.us-east-1.amazonaws.com/delete_task`, { data: { id_task } });
      alert("Tarea eliminada correctamente!");
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Crear y Administrar Tareas
        </Typography>

        <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
          <TextField
            name="name"
            label="Task Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={description}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            variant="outlined"
            fullWidth
            required
            value={date}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="hour"
            label="Hour"
            type="time"
            variant="outlined"
            fullWidth
            required
            value={hour}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="course-select-label">Select Course</InputLabel>
            <Select
              labelId="course-select-label"
              value={id_course}
              onChange={handleSelectChange}
              required
            >
              {courses.map((course) => (
                <MenuItem key={course.id_course} value={course.id_course}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Crear Tarea
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Tareas Existentes
          </Typography>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id_task}>
                <ListItemText
                  primary={task.name}
                  secondary={`Description: ${task.description} | Date: ${task.date} | Hour: ${task.hour}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id_task)}>
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

export default CreateTasks;
