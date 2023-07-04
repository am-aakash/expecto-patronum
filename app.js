const express = require('express');
const CONFIG = require('./config/config');
const app = express();
const { startEmailHandling } = require('./services/emailHandler');

startEmailHandling();

// Server
const port = CONFIG.port;
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});