// send emails
require("dotenv").config();

const sgMail = require("@sendgrid/mail");
const schedule = require("node-schedule");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const message = {
  to: "wenling_ing@hotmail.com",
  from: {
    name: "Your Habit Tracker",
    email: "yuwenlingevelyn@gmail.com",
  },
  subject: "Cheers to a new day! Here are Todays Goals",
  text: "Hello text",
  html: "<h1> Good Morning from Habit tracker</h1>",
};

async function sendEmail() {
  try {
    await sgMail.send(message);
  } catch (error) {
    console.log(error.message);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}

const job = schedule.scheduleJob("14 11 * * *", function () {
  sendEmail();
});
