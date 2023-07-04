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

/*
    PACKAGES USED:

    Package for loading environment variables from a .env file
    "dotenv": "^16.3.1",

    Fast, unopinionated, minimalist web framework for Node.js
    "express": "^4.18.2",

    Google Auth Library for handling authentication with Google APIs
    "google-auth-library": "^8.9.0",

    Library for interacting with various Google APIs
    "googleapis": "^105.0.0",

    Automatically restarts the server when file changes are detected (development tool)
    "nodemon": "^2.0.22",

*/