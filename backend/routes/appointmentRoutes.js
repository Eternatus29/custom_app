// backend/routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Appointment = require('../models/Appointment');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
  const { filename, path } = req.file;
  res.json({ filename, path });
});

router.post('/add-appointment', async (req, res) => {
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
});

router.get('/get-appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete-appointment/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (deletedAppointment) {
      res.status(200).json({ message: 'Appointment deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Appointment not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
