const express = require('express');
const router = express.Router();
const fs = require('fs');


// Read json sample json file and push it to url
router.get('/', (req, res) => {
  read_json_file('sample_data/sample.json')
    .then((jsonData) => res.json(jsonData))
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
