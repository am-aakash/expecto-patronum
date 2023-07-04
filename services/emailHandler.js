const { authenticate } = require('./authenticate');
const getRandomInterval = require('../utils/getRandomInterval');

function startEmailHandling() {
    // Authenticate with Gmail API, Gets unread emails, Replies to those emails and changes Label
    authenticate();

    // calls Email Handling on every random interval between 45 to 120 seconds
    setTimeout(() => {
        startEmailHandling();
    }, getRandomInterval(45000, 120000));
}

module.exports = {
    startEmailHandling,
};
