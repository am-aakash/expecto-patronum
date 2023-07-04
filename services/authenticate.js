const { google } = require('googleapis');
const { getUnreadEmails } = require('../controller/getUnreadEmail');
const { replyToEmail } = require('../controller/replyToEmail');
const { markEmailAsReplied } = require('../controller/markEmailAsReplied');
const credentials = require('../config/credentials.json');
const { client_secret, client_id, redirect_uris } = credentials.web;
require('dotenv').config();

// Authenticate with Gmail API, Gets unread emails, Replies to those emails and changes Label
async function authenticate() {
    try {
        // Create a new instance of OAuth2Client using the provided client ID, client secret, and redirect URI
        const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0]
        );

        // Set the credentials for the OAuth2Client using the access token and refresh token from the environment variables
        oAuth2Client.setCredentials({
            access_token: process.env.ACCESS_TOKEN,
            refresh_token: process.env.REFRESH_TOKEN
        });

        // Create a Gmail client instance using the Gmail API version and the authenticated OAuth2Client
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

        // Get unread email IDs
        const emailIds = await getUnreadEmails(gmail);
        console.log(emailIds);

        if (emailIds.length > 0) {
            for (const emailId of emailIds) {
                // Reply to the email
                await replyToEmail(gmail, emailId);

                // Mark the email as replied
                await markEmailAsReplied(gmail, emailId);
            }
        } else {
            console.log('No unread emails found within the last 60 minutes.');
        }
    } catch (err) {
        console.error('Error authenticating:', err);
    }
}

module.exports = {
    authenticate,
};