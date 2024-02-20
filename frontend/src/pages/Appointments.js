// Ensure to import React and necessary hooks from 'react'
import React, { useState, useEffect } from 'react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ name: '', date: '', time: '' });

  useEffect(() => {
    // Implementation remains the same for fetching appointments
  }, []);

  // Handlers remain the same
  const handleInputChange = (e) => {/* ... */};
  const handleAddAppointment = async () => {/* ... */};
  const handleDeleteAppointment = async (id) => {/* ... */};

  return (
    <div className="min-h-screen bg-dark-blue text-white p-4">
      <div className="max-w-md mx-auto bg-white/30 backdrop-blur-sm rounded-lg p-4">
        <h2 className="text-xl font-bold text-center">Add New Appointment</h2>
        <div className="my-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newAppointment.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded my-2 bg-white/50"
          />
          <input
            type="date"
            name="date"
            value={newAppointment.date}
            onChange={handleInputChange}
            className="w-full p-2 rounded my-2 bg-white/50"
          />
          <input
            type="time"
            name="time"
            value={newAppointment.time}
            onChange={handleInputChange}
            className="w-full p-2 rounded my-2 bg-white/50"
          />
          <button
            onClick={handleAddAppointment}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Appointment
          </button>
        </div>
      </div>
      <div className="max-w-md mx-auto mt-8">
        <h3 className="text-2xl font-bold text-center">Appointments</h3>
        <ul className="divide-y divide-gray-300/50">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="flex justify-between items-center py-3">
              <div>
                <p className="font-semibold">{appointment.name}</p>
                <p>{`Date: ${new Date(appointment.date).toLocaleDateString()}, Time: ${new Date(`2022-01-01T${appointment.time}:00`).toLocaleTimeString([], { timeStyle: 'short' })}`}</p>
              </div>
              <button
                onClick={() => handleDeleteAppointment(appointment._id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Appointments;
