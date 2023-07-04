async function replyToEmail(gmail, emailId) {
  try {
    const msg = await gmail.users.messages.get({
      userId: 'me',
      id: emailId,
    });

    const reply = {
      userId: 'me',
      resource: {
        raw: Buffer.from(
          `To: ${msg.data.payload.headers.find(
            (header) => header.name === 'From'
          ).value}\r\n` +
          `Subject: Re: ${msg.data.payload.headers.find(
            (header) => header.name === 'Subject'
          ).value}\r\n` +
          `\r\n` +
          `Thank you for your email!`,
          'utf-8'
        ).toString('base64'),
      },
    };

    await gmail.users.messages.send(reply);
    console.log('Replied to email:', msg.data.id);
  } catch (error) {
    console.error('Error replying to email:', error);
  }
}

module.exports = {
  replyToEmail,
};