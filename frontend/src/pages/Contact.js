import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import { useSpring, animated } from '@react-spring/web'; // For animations

// Animated components
const AnimatedBox = animated(Box);

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Animation properties
  // Removed the reset property to prevent animation from triggering on each re-render
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1, // Directly set the final state of the animation
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/users/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, message }),
    });
  };

  return (
    <Container maxWidth="sm">
      <AnimatedBox style={fade}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={handleEmailChange}
            value={email}
          />
          <TextField
            label="Message"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={handleMessageChange}
            value={message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send
          </Button>
        </form>
      </AnimatedBox>
    </Container>
  );
};

export default Contact;
