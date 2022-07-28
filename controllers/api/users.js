const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const welcomeEmail = require("./controllers/api/sendEmail");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  create,
  login,
  checkToken,
};

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json(createJWT(user));
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);

    ////send out - Welcome email
    console.log("new user email: " + req.body.email);
    const welcomeMessage = {
      to: req.body.email,
      from: {
        name: "Your Habit Tracker",
        email: process.env.SENDER_EMAIL,
      },
      subject: "Cheers to a new day!",
      text: "Welcome to Habit Tracker!",
      html: `<h1>Welcome to Habit Tracker!</h1>
              <h3>Follow your own schedule and track your own goals.</h3>
      `,
    };
    sgMail.send(welcomeMessage);
    console.log("Welcome email sent out");

    // send back the token as a string
    // which we need to account for
    // in the client
    res.json(token);
  } catch (e) {
    res.status(400).json(e);
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
