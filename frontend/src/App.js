import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NavbarAdmin from "./adminComponens/NavbarAdmin"; // Nuevo Navbar para admins
import Schedules from "./components/Schedules";
import Reminders from "./components/Reminders";
import Tasks from "./components/Tasks";
import HomeAdmin from "./adminComponens/HomeAdmin";
import CreateCourses from "./adminComponens/CreateCourses";
import CreateTasks from "./adminComponens/CreateTasks";
import UsersAdmin from "./adminComponens/UsersAdmin";
import VerPerfilAdmin from "./adminComponens/VerPerfilAdmin";
import Perfil from "./components/Perfil";
import Functions from "./components/Functions";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";

// Componente que contiene la lógica para mostrar el Navbar adecuado
function Layout() {
  const location = useLocation();

  // Verifica si el usuario es admin (ej. basado en localStorage)
  const isAdmin = localStorage.getItem("role") === "admin"; 

  const renderNavbar = () => {
    if (location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/") {
      return null; // No mostrar ningún Navbar en las rutas de login y registro
    }
    return isAdmin ? <NavbarAdmin /> : <Navbar />;
  };

  return (
    <>
      {renderNavbar()}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/homeAdmin" element={<HomeAdmin />} />
        <Route path="/coursesAdmin" element={<CreateCourses />} />
        <Route path="/taskAdmin" element={<CreateTasks />} />
        <Route path="/usersAdmin" element={<UsersAdmin />} />
        <Route path="/perfilAdmin" element={<VerPerfilAdmin />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/functions" element={<Functions />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
