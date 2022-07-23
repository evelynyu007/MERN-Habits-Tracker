// front side connects with back side
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan"); //logging middleware
require("dotenv").config();
require("./config/database"); // connect to the database(after dotenv)

const app = express();

app.use(logger("dev"));
app.use(express.json()); // middleware that processes JSON data sent in the AJAX request and adds it to the req.body

// NOTE: why no express.urlencoded() middleware
// It is used to process data submitted by a form - and we don't submit forms in a SPA.

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Put API routes here, before the "catch all" route

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
// not use render coz no templating engine
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
// NOTE:
// 3000 is for development(npm start),
// 3001 is for production( nodemon server.js - backend) - in build folder -heroku need to handle build folder
// npm run build to update production code
// build folder is for server, for backend, we need server to serve index.html in build folder

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
