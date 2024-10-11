import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Schedules from "./components/Schedules";
import Reminders from "./components/Reminders";
import Tasks from "./components/Tasks";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

// Componente que contiene la lógica para mostrar el Navbar condicionalmente
function Layout() {
  const location = useLocation(); // Usamos el hook useLocation para obtener la ruta actual

  return (
    <>
      {/* Solo mostramos el Navbar si no estamos en /login o /register */}
      {location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* El componente Layout maneja la renderización condicional del Navbar y las rutas */}
        <Layout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
