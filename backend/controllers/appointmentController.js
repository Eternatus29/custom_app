// backend/controllers/appointmentController.js
const Appointment = require('../models/Appointment');

exports.addAppointment = async (req, res) => {
  try {
    const { name, date, time } = req.body;

    const newAppointment = new Appointment({
      name,
      date,
      time,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
