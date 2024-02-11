// src/pages/Home.js
import React from 'react';
import { AppBar, Container, CssBaseline, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Check if there's a valid token in localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    
    // Refresh the home page
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Custom App
          </Typography>
          {isAuthenticated ? (
            <div>
              <Button color="inherit" onClick={() => navigate('/call-record-management')} sx={{ marginRight: 2 }}>
                Call Record Management
              </Button>
              <Button color="inherit" onClick={() => navigate('/appointments')} sx={{ marginRight: 2 }}>
                Appointments
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" onClick={() => navigate('/login')} sx={{ marginRight: 2 }}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')} sx={{ marginRight: 2 }}>
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Container
        component="main"
        maxWidth="md"
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Custom App
        </Typography>
        <Typography variant="body1" paragraph>
          This is the homepage.
        </Typography>
      </Container>

      <AppBar position="static" color="default" sx={{ marginTop: 'auto' }}>
        <Toolbar>
          <Typography variant="body2" color="inherit" sx={{ margin: 'auto' }}>
            © 2024 Custom App. All rights reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Home;
