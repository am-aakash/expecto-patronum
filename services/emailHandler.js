const { authenticate } = require('./authenticate');
const getRandomInterval = require('../utils/getRandomInterval');

function startEmailHandling() {
    authenticate();

    setTimeout(() => {
        startEmailHandling();
    }, getRandomInterval(45000, 120000));
}

module.exports = {
    startEmailHandling,
};
