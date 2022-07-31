const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { welcomeEmail } = require("./sendEmail");

module.exports = {
  create,
  login,
  checkToken,
  subscribeOrNot,
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
    // send out welcome email
    welcomeEmail(req.body.email);

    // send back the token as a string
    // which we need to account for
    // in the client
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// TODO:
// subscribe/unsubscribe
async function subscribeOrNot(req, res) {
  console.log("controller: ", req.body);
  const sub = req.body.subscribe;
  console.log("subscribe? ", sub);
  await User.updateOne({ _id: req.body._id }, { subscribe: sub });
}
