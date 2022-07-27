// send emails
require("dotenv").config();
const User = require("../../models/user");
const Habit = require("../../models/habit");

const sgMail = require("@sendgrid/mail");
const schedule = require("node-schedule");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const job = schedule.scheduleJob("* 51 14 * * *", async function () {
  //send emails to all the users
  //TODO: is it better to use controllers, routes to do the whole thing????
  const allUsers = await User.find({});

  for (let i = 0; i < allUsers.length; i++) {
    const user = allUsers[i];
    const userHabits = await Habit.find({ user: user._id });
    // console.log(userHabits);

    const message = {
      to: `${user.email}`,
      from: {
        name: "Your Habit Tracker",
        email: "yuwenlingevelyn@gmail.com",
      },
      subject: "Cheers to a new day!",
      text: "Hello text",
      //TODO: sendGrid html template???
      html: "<h1>Here are Todays Goals</h1><ol>{{#each userHabits}}{{this.title}} for {{this.duration}} hour(s)</li>{{/each}} </ol><a href='https://github.com/evelynyu007/MERN-Habits-Tracker'>More On Habit Tracker</a> ",
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

    sendEmail();
  }
});

module.exports = { job };
