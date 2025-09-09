// server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const { getDatabase, ref, set } = require('firebase/database');
const { database } = require('./firebaseConfig');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/storeSensorData', (req, res) => {
  const { adminId, adminName, institutionName, location,sensorData } = req.body;
  console.log('Received data:', req.body);
  if (!sensorData || !adminName || !adminId || !location || !institutionName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sensorRef = ref(database, 'sensors/' + Date.now());

  set(sensorRef, {
    sensorData,
    adminName,
    adminId,
    institutionName,
    location,
    timestamp: new Date().toISOString()
  })
    .then(() => res.status(200).json({ message: 'Data stored successfully' }))
    .catch((error) => res.status(500).json({ message: error.message }));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
