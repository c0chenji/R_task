const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/takeHomeTask', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB..."'))
  .catch((error) => console.log("could not connect to MongoDB..", error));

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
const Data = mongoose.model('dataLog', dataSchema);

// Helper function for time range query
function applyTimeRange(startDate, endDate) {
  let query = {};

  if (startDate && endDate) {
    query.originationTime = { $gte: startDate, $lte: endDate };
  }

  return query;
}
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Define route to get all data from MongoDB
router.get('/', (req, res) => {
  Data.find({})
    .then((data) => res.json(data))
    .catch((error) => res.status(400).send(error.message));
});

router.get('/phone/:phone', (req, res) => {
  const phone = req.params.phone;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  let query = { 
    'devices.phone': phone,
    ...applyTimeRange(startDate, endDate),
  };


  
  Data.find(query)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).send(error.message));
});

router.get('/voicemail/:voicemail', (req, res) => {
  const voicemail = req.params.voicemail;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  let query = { 
    'devices.voicemail': voicemail,
    ...applyTimeRange(startDate, endDate)
  };

  
  Data.find(query)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).send(error.message));
});

router.get('/clusterId/:clusterId', (req, res) => {
  const clusterId = req.params.clusterId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const query = {
    clusterId: clusterId,
    ...applyTimeRange(startDate, endDate)
  };

  Data.find(query)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).send(error.message));
});

router.get('/userId/:userId', (req, res) => {
  const userId = req.params.userId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const query = {
    userId: userId,
    ...applyTimeRange(startDate, endDate)
  };

  Data.find(query)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).send(error.message));
});


module.exports = router;