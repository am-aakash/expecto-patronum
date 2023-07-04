const { google } = require('googleapis');
const { getUnreadEmails } = require('../controller/getUnreadEmail');
const { replyToEmail } = require('../controller/replyToEmail');
const { markEmailAsReplied } = require('../controller/markEmailAsReplied');
const credentials = require('../config/credentials.json');
const { client_secret, client_id, redirect_uris } = credentials.web;
require('dotenv').config();

async function authenticate() {
    try {
        const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0]
        );

        oAuth2Client.setCredentials({
            access_token: process.env.ACCESS_TOKEN,
            refresh_token: process.env.REFRESH_TOKEN
        });
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

        // Get unread email IDs
        const emailIds = await getUnreadEmails(gmail);
        console.log(emailIds);

        if (emailIds.length > 0) {
            for (const emailId of emailIds) {
                await replyToEmail(gmail, emailId);
                await markEmailAsReplied(gmail, emailId);
            }
        } else {
            console.log('No unread emails found within the last 15 minutes.');
        }
    } catch (err) {
        console.error('Error authenticating:', err);
    }
}

module.exports = {
    authenticate,
};