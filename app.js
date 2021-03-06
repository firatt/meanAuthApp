const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect to DB
mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
    console.log("Connected to database: " + config.database);
});
mongoose.connection.on("error", (err) => {
    console.warn("Database error: " + err);
});

const app = express();
const port = 3000;
const users = require("./routes/users");

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use("/users", users);

// Index Route
app.listen(port, () => {
    console.log("Server started on port " + port);
});

// Start Server
app.get("/", (req, res) => {
    res.send("Invalid endpoint");
});