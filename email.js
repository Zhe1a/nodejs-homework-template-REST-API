
const sgMail = require('@sendgrid/mail')
const dotenv = require("dotenv");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'mgr58006@gmail.com', // Change to your recipient
  from: 'mgr58006@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })


//   echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env