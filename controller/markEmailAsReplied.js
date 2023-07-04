const credentials = require('../config/credentials.json');

async function markEmailAsReplied(gmail, emailId) {
    const request = {
        userId: 'me',
        id: emailId,
        resource: {
            addLabelIds: [credentials.web.label_id], // represents the 'replied' label in Gmail
            removeLabelIds: ['UNREAD'], // Remove the 'UNREAD' label
        },
    };

    try {
        const response = await gmail.users.messages.modify(request);
        console.log('Email marked as replied:', response.data);
    } catch (error) {
        console.error('Error marking email as replied:', error);
    }
}

module.exports = {
    markEmailAsReplied,
};