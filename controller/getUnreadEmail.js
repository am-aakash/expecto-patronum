async function getUnreadEmails(gmail) {
    try {
        // Calculate the timestamp for 60 minutes ago
        const lastHour = new Date();
        lastHour.setMinutes(lastHour.getMinutes() - 60);
        const timestamp = Math.floor(lastHour.getTime() / 1000);

        // Retrieve unread messages from Gmail API (With Filters added for testing)
        const res = await gmail.users.messages.list({
            userId: 'me',
            q: `is:unread from:study12121@gmail.com after:${timestamp}`, // from sender email in last 60 mins
        });

        const emails = res.data.messages;
        const emailIds = emails ? emails.map((email) => email.id) : [];

        return emailIds;
    } catch (err) {
        console.error('Error retrieving emails:', err);
        return [];
    }
}

async function getLabelIds(gmail) {
    try {
        const response = await gmail.users.labels.list({ userId: 'me' });
        const labels = response.data.labels;
        const labelIds = labels.map((label) => label.id);
        console.log('Label IDs:', labelIds);
    } catch (error) {
        console.error('Error retrieving label IDs:', error);
    }
}

module.exports = {
    getUnreadEmails,
};