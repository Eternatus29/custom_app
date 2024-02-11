// src/pages/Register.js
import React, { useState } from 'react';
import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registerError, setRegisterError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User registered successfully:', result);

        // Save the token to localStorage or a secure cookie
        localStorage.setItem('token', result.token);

        // Redirect to the home page
        navigate('/'); // Use the navigate function to go to the home page
      } else {
        const errorResult = await response.json();
        console.error('Failed to register:', errorResult);
        setRegisterError(errorResult.error || 'Registration failed.'); // Set an error message
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegisterError('Internal Server Error. Please try again.'); // Set an error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        {registerError && (
          <Typography variant="body2" color="error" align="center">
            {registerError}
          </Typography>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                name="password"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                name="confirmPassword"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
