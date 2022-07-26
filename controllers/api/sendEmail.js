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
      // if no habits
      if (allHabitsList === "") {
        allHabitsList = "No Goals for today. Go and create one!";
      }
      return allHabitsList;
    }

    const message = {
      to: `${user.email}`,
      from: {
        name: "Your Habit Tracker",
        email: process.env.SENDER_EMAIL,
      },
      subject: "Cheers to a new day!",
      text: "Hello",
      html: `
            <h1>Good morning, ${user.name}</h1>  
            <h2>Here are Today's Goals</h2>          
            <ol>
            ${habitsList()}
            </ol>

            
            <a href='https://mern-routine-tracker.herokuapp.com/'>Log In to Routine Tracker</a> 

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
    user.subscribe && console.log("email sent out: " + i);
    // send email to subscriber
    user.subscribe && sendEmail();
  }
});

//////////////////////////////////////////////////////////
// send welcome email
//////////////////////////////////////////////////////////
function welcomeEmail(userEmail) {
  // const welcomeMessage = {
  //   to: userData.email,
  //   from: {
  //     name: "Your Habit Tracker",
  //     email: process.env.SENDER_EMAIL,
  //   },
  //   templatedId: "d-747b180b5a73421ba09cb272824c4228",
  //   dynamic_template_data: {
  //     subject: "Welcome to Habits Tracker!",
  //     name: userData.name,
  //   },
  // };
  const welcomeMessage = {
    to: userEmail,
    from: {
      name: "Your Habit Tracker",
      email: process.env.SENDER_EMAIL,
    },
    subject: "Welcome to Routine Tracker!",
    text: "Welcome to Routine Tracker!",
    html: `<h1>Welcome to Routine Tracker!</h1>
            <h3>Follow your own schedule and track your own goals.</h3>
            <a href='https://github.com/evelynyu007/MERN-Habits-Tracker'>More Details about Routine Tracker</a> 
    `,
  };
  sgMail.send(welcomeMessage);
  console.log("Welcome email sent out");
}

module.exports = { job, welcomeEmail };
