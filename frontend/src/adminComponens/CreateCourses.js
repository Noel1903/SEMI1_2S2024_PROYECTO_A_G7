import React, { useState, useEffect } from "react";
import { Box, Button, Container, TextField, Typography, Stack, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const CreateCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({
    name: "",
    credits: "",
    start_time: "",
    end_time: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [courseId, setCourseId] = useState(null); // Almacenar el ID para editar

  // Obtener cursos existentes
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://balanceado-semi1-502fe059c57d10ca.elb.us-east-1.amazonaws.com/get_all_courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put("http://balanceado-semi1-502fe059c57d10ca.elb.us-east-1.amazonaws.com/update_course", {
            
            name: courseData.name,
            credits: courseData.credits,
            start_time: courseData.start_time,
            end_time: courseData.end_time,
            id_course: courseId,
        });
        alert("Curso editado correctamente!");
      } else {
        await axios.post("http://balanceado-semi1-502fe059c57d10ca.elb.us-east-1.amazonaws.com/create_course", courseData);
        alert("Curso creado correctamente!");
      }
      fetchCourses(); // Actualizar lista de cursos
      setCourseData({ name: "", credits: "", start_time: "", end_time: "" });
      setEditMode(false);
    } catch (error) {
      console.error("Error al guardar curso", error);
    }
  };

  const handleDelete = async (id_course) => {
    try {
      await axios.delete("http://balanceado-semi1-502fe059c57d10ca.elb.us-east-1.amazonaws.com/delete_course", {
        data: { id_course },
      });
      alert("Curso eliminado correctamente!");
      fetchCourses(); // Actualizar lista de cursos
    } catch (error) {
      console.error("Error al eliminar curso:", error);
    }
  };
  

  const handleEdit = (course) => {
    setCourseData({
      name: course.name,
      credits: course.credits,
      start_time: course.start_time,
      end_time: course.end_time,
    });
    setCourseId(course.id_course); // Guardar el ID del curso a editar
    setEditMode(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Crear o Editar Cursos
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Stack spacing={2}>
          <TextField
            label="Course Name"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Credits"
            name="credits"
            type="number"
            value={courseData.credits}
            onChange={handleChange}
            required
          />
          <TextField
            label="Start Time"
            name="start_time"
            type="time"
            value={courseData.start_time}
            onChange={handleChange}
            required
          />
          <TextField
            label="End Time"
            name="end_time"
            type="time"
            value={courseData.end_time}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {editMode ? "Update Course" : "Create Course"}
          </Button>
        </Stack>
      </Box>

      <Typography variant="h5" gutterBottom>
        Cursos Existentes
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Credits</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id_course}>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.credits}</TableCell>
              <TableCell>{course.start_time}</TableCell>
              <TableCell>{course.end_time}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(course)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(course.id_course)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default CreateCourses;
