// src/pages/Appointments.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ name: '', date: '', time: '' });

  useEffect(() => {
    // Fetch appointments from the backend when the component mounts
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/appointments/get-appointments');
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error('Failed to fetch appointments.');
        }
      } catch (error) {
        console.error('Error during appointment fetch:', error);
      }
    };

    fetchAppointments();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAppointment = async () => {
    try {
      const response = await fetch('http://localhost:5000/appointments/add-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });

      if (response.ok) {
        console.log('Appointment added successfully.');
        // Fetch updated appointments after adding a new one
        const updatedAppointments = await (await fetch('http://localhost:5000/appointments/get-appointments')).json();
        setAppointments(updatedAppointments);
        // Clear the form
        setNewAppointment({ name: '', date: '', time: '' });
      } else {
        console.error('Failed to add appointment.');
      }
    } catch (error) {
      console.error('Error during appointment addition:', error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/appointments/delete-appointment/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Appointment deleted successfully.');
        // Fetch updated appointments after deleting one
        const updatedAppointments = await (await fetch('http://localhost:5000/appointments/get-appointments')).json();
        setAppointments(updatedAppointments);
      } else {
        console.error('Failed to delete appointment.');
      }
    } catch (error) {
      console.error('Error during appointment deletion:', error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6">Add New Appointment</Typography>
        <TextField
          label="Name"
          name="name"
          value={newAppointment.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={newAppointment.date}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Time"
          name="time"
          type="time"
          value={newAppointment.time}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddAppointment} style={{ marginTop: '10px' }}>
          Add Appointment
        </Button>
      </div>
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Appointments
      </Typography>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment._id}>
            <ListItemText
              primary={appointment.name}
              secondary={`Date: ${new Date(appointment.date).toLocaleDateString()}, Time: ${new Date(`2022-01-01T${appointment.time}:00`).toLocaleTimeString([], { timeStyle: 'short' })}`}
            />
            <IconButton color="secondary" onClick={() => handleDeleteAppointment(appointment._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Appointments;
