// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, CssBaseline, TextField, Typography } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);

        // Save the token to localStorage or a secure cookie
        localStorage.setItem('token', result.token);

        // Redirect to a protected route or handle success as needed
        navigate('/');
      } else {
        const errorResult = await response.json();
        console.error('Failed to login:', errorResult);
        setLoginError(errorResult.error || 'Login failed.'); // Set an error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Internal Server Error. Please try again.'); // Set an error message
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {loginError && (
          <Typography variant="body2" color="error" align="center">
            {loginError}
          </Typography>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
