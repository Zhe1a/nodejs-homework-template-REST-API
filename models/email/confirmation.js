const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config();

const confirmation = (headers,email,token) => {
  console.log(email);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "mgr58006@gmail.com",
    from: `${email}`, 
    subject: "Sending with SendGrid is Fun",
    text: "confirm registration click on the link",
    link: `http://${headers.host}/auth/verify/:${token}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = confirmation