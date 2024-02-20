// // src/pages/Home.js
// import React from 'react';
// import { AppBar, Container, CssBaseline, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   // Check if there's a valid token in localStorage
//   const isAuthenticated = !!localStorage.getItem('token');

//   const handleLogout = () => {
//     // Clear the token from localStorage
//     localStorage.removeItem('token');
    
//     // Refresh the home page
//     window.location.reload();
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <CssBaseline />
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Custom App
//           </Typography>
//           {isAuthenticated ? (
//             <div>
//               <Button color="inherit" onClick={() => navigate('/call-record-management')} sx={{ marginRight: 2 }}>
//                 Call Record Management
//               </Button>
//               <Button color="inherit" onClick={() => navigate('/appointments')} sx={{ marginRight: 2 }}>
//                 Appointments
//               </Button>
//               <Button color="inherit" onClick={() => navigate('/contact')} sx={{ marginRight: 2 }}>
//                 Contact
//               </Button>
//               <Button color="inherit" onClick={handleLogout}>
//                 Logout
//               </Button>
//             </div>
//           ) : (
//             <div>
//               <Button color="inherit" onClick={() => navigate('/login')} sx={{ marginRight: 2 }}>
//                 Login
//               </Button>
//               <Button color="inherit" onClick={() => navigate('/register')} sx={{ marginRight: 2 }}>
//                 Register
//               </Button>
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container
//         component="main"
//         maxWidth="md"
//         sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
//       >
//         <Typography variant="h2" gutterBottom>
//           Welcome to Custom App
//         </Typography>
//         <Typography variant="body1" paragraph>
//           This is the homepage.
//         </Typography>
//       </Container>

//       <AppBar position="static" color="default" sx={{ marginTop: 'auto' }}>
//         <Toolbar>
//           <Typography variant="body2" color="inherit" sx={{ margin: 'auto' }}>
//             © 2024 Custom App. All rights reserved.
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

// export default Home;

// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const drawerWidth = 240;

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {isLoggedIn ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/call-record-management">
                <ListItemText primary="Call Records" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/appointments">
                <ListItemText primary="Appointments" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/contact">
                <ListItemText primary="Send Mail" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/register">
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Custom App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>
      <main style={{ flexGrow: 1, padding: 3, marginTop: '64px' }}>
        <Typography paragraph>
          Welcome to the home page!
        </Typography>
        <Typography>
          Content will be added as per requirements.
        </Typography>
      </main>
    </div>
  );
}

export default HomePage;
