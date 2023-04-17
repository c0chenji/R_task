const express = require('express');
const app = express();

// Import routes
const readJsonRoutes = require('./routes/read_json');
const mongo_endpoint = require('./routes/mongo_endpoint');

app.use(express.json());

// Use routes
app.use('/read_json', readJsonRoutes);
app.use('/mongodb', mongo_endpoint);
// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

