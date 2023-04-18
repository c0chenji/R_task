const express = require('express');
const router = express.Router();
const fs = require('fs');


// Read json sample json file and push it to url
router.get('/', (req, res) => {
  read_json_file('sample_data/sample.json')
    .then((jsonData) => res.json(jsonData))
    .catch((error) => res.status(500).send(error.message));
});

router.get('/phone/:phoneNumber', (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  read_json_file('sample_data/sample.json')
    .then((jsonData) => {
      const filteredData = jsonData.filter((data) => data.devices.phone === phoneNumber);
      res.json(filteredData);
    })
    .catch((error) => res.status(500).send(error.message));
});

router.get('/voicemail/:voicemail', (req, res) => {
  const voicemail = req.params.voicemail;
  read_json_file('sample_data/sample.json')
    .then((jsonData) => {
      const filteredData = jsonData.filter((data) => data.devices.voicemail === voicemail);
      res.json(filteredData);
    })
    .catch((error) => res.status(500).send(error.message));
});

router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  read_json_file('sample_data/sample.json')
    .then((jsonData) => {
      const filteredData = jsonData.filter((data) => data.userId === userId);
      res.json(filteredData);
    })
    .catch((error) => res.status(500).send(error.message));
});

router.get('/cluster/:clusterId', (req, res) => {
  const clusterId = req.params.clusterId;
  read_json_file('sample_data/sample.json')
    .then((jsonData) => {
      const filteredData = jsonData.filter((data) => data.clusterId === clusterId);
      res.json(filteredData);
    })
    .catch((error) => res.status(500).send(error.message));
});

function read_json_file(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
      if (error) {
        reject(error);
      } else {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      }
    });
  });
}

module.exports = router;
