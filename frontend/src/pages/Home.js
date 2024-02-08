// src/pages/Home.js
import React from 'react';
import { AppBar, Container, CssBaseline, Link, Toolbar, Typography } from '@mui/material';

const Home = () => {
  // Placeholder for authentication status. Replace it with your actual authentication logic.
  const isAuthenticated = true; // Replace with your authentication logic

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
              <Link href="/call-record-management" color="inherit" sx={{ marginRight: 2 }}>
                Call Record Management
              </Link>
              <Link href="/logout" color="inherit">
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/login" color="inherit" sx={{ marginRight: 2 }}>
                Login
              </Link>
              <Link href="/register" color="inherit">
                Register
              </Link>
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

      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="body2" color="inherit" sx={{ flexGrow: 1 }}>
            © 2024 Custom App. All rights reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Home;
