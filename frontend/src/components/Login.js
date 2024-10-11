import React from "react";
import { Link } from "react-router-dom";
import { Box, TextField, Button, Typography, Container, Stack } from "@mui/material";

const Login = () => {
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
        <Box component="form" sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Username"
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
            <Button variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Button variant="outlined" color="secondary" fullWidth>
              Facial Recognition
            </Button>
          </Stack>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
