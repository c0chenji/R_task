const express = require('express');
const router = express.Router();
const fs = require('fs');


// Read json from route
router.get('/', (req, res) => {
  readJsonFile('sample_data/sample.json')
    .then((jsonData) => res.json(jsonData))
    .catch((error) => res.status(500).send(error.message));
});

function readJsonFile(filename) {
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
