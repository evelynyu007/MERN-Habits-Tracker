// send emails
require("dotenv").config();
const User = require("../../models/user");
const Habit = require("../../models/habit");

const sgMail = require("@sendgrid/mail");
const schedule = require("node-schedule");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

////////////////////////////////////////////////
// Send out today's goals emails at 07:10
////////////////////////////////////////////////
const job = schedule.scheduleJob("10 7 * * *", async function () {
  //send emails to all the users
  //TODO: is it better to use controllers, routes to do the whole thing????
  const allUsers = await User.find({});

  for (let i = 0; i < allUsers.length; i++) {
    const user = allUsers[i];
    const userHabits = await Habit.find({ user: user._id });
    // console.log(userHabits);
    // undefined
    function habitsList() {
      let allHabitsList = "";
      userHabits.forEach((h) => {
        allHabitsList += `<li>${h.title} for ${h.duration} hour(s)</li>`;
      });
      return allHabitsList;
    }

    const message = {
      to: `${user.email}`,
      from: {
        name: "Your Habit Tracker",
        email: process.env.SENDER_EMAIL,
      },
      subject: "Cheers to a new day!",
      text: "Hello text",
      html: `
            <h1>Good morning, ${user.name}</h1>  
            <h2>Here are Today's Goals</h2>          
            <ol>
            ${habitsList()}
            </ol>
            <a href='https://github.com/evelynyu007/MERN-Habits-Tracker'>More On Habit Tracker</a> 
            <p>Have a great day,<p>
            <p>Habit Tracker Team</p>
            `,
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
    console.log("email sent out");
    sendEmail();
  }
});

//////////////////////////////////////////////////////////
// TODO: send welcome email here?
//////////////////////////////////////////////////////////
function welcomeEmail(userData) {
  const msg = {
    to: userData.email,
    from: {
      name: "Your Habit Tracker",
      email: process.env.SENDER_EMAIL,
    },
    templatedId: "d-747b180b5a73421ba09cb272824c4228",
    dynamic_template_data: {
      subject: "Welcome to Habits Tracker!",
      name: userData.name,
    },
  };
  return sgMail.send(msg);
}

module.exports = { job, welcomeEmail };
