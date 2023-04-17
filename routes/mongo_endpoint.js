const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myDatabase', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

// Define schema for data model
const dataSchema = new mongoose.Schema({
  originationTime: Number,
  clusterId: String,
  userId: String,
  devices: {
    phone: String,
    voicemail: String
  }
});

// Define data model
const Data = mongoose.model('Data', dataSchema);

// Define route to get all data from MongoDB
router.get('/', (req, res) => {
  Data.find({})
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send(error.message));
});

router.get('/phone/:phone', (req, res) => {
  const phone = req.params.phone;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  let query = { 'devices.phone': phone };

  if (startDate && endDate) {
    query.originationTime = { $gte: startDate, $lte: endDate };
  }
  
  Data.find(query)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send(error.message));
});

// // Define route to get data by voicemail
// router.get('/voicemail/:voicemail', (req, res) => {
//   const voicemail = req.params.voicemail;
//   const query = { 'devices.voicemail': voicemail, originationTime: { $gte: req.query.startDate, $lte: req.query.endDate } };
//   Data.find(query)
//     .then((data) => res.json(data))
//     .catch((error) => res.status(500).send(error.message));
// });

// // Define route to get data by user id
// router.get('/userId/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const query = { userId: userId, originationTime: { $gte: req.query.startDate, $lte: req.query.endDate } };
//   Data.find(query)
//     .then((data) => res.json(data))
//     .catch((error) => res.status(500).send(error.message));
// });

// Define route to get data by cluster
router.get('/cluster/:clusterId', (req, res) => {
  const clusterId = req.params.clusterId;
  const query = { clusterId: clusterId, originationTime: { $gte: req.query.startDate, $lte: req.query.endDate } };
  Data.find(query)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send(error.message));
});

module.exports = router;