// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CallRecordManagement from './pages/CallRecordManagement';
import Appointments from './pages/Appointments'; // Add this import
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/call-record-management" element={<CallRecordManagement />} />
        <Route path="/appointments" element={<Appointments />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
