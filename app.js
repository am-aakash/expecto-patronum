const express = require('express');
const CONFIG = require('./config/config');
const app = express();
const { startEmailHandling } = require('./services/emailHandler');

// Starts the email handling process
startEmailHandling();

// Server
const port = CONFIG.port;
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});