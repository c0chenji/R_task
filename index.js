const express = require('express');
const app = express();
const logger = require("./middleware/logger");
const authentication = require("./middleware/authentication");

const morgan = require("morgan");
const helmet = require("helmet");
// Import routes
const readJsonRoutes = require('./routes/read_json');
const mongo_endpoint = require('./routes/mongo_endpoint');

app.use(express.json());

// Use routes
app.use('/read_json', readJsonRoutes);
app.use('/mongodb', mongo_endpoint);

app.use(morgan('combined'));

app.use(helmet());
app.use(logger);
app.use(authentication);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

