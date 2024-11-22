// [SECTION] Dependencies and Modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Google Login
const passport = require("passport");
const session = require("express-session");
require("./passport");

const cors = require("cors");

const userRoutes = require("./routes/user");

// [SECTION] Environment Setup
const port = 4000;

// [SECTION] Server Setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use(cors());

// [Section] Google Login
// Creates a session with the given data
// resave prevents the session from overwriting the secret while the session is active
// saveUninitialized prevents the data from storing data in the session while the data has not yet been initialized
app.use(session({
	secret: process.env.clientSecret,
	resave: false,
	saveUninitialized: false
}));
// Initializes the passport package when the application runs
app.use(passport.initialize());
// Creates a session using the passport package
app.use(passport.session());

// [SECTION] Database Connection
mongoose.connect("mongodb+srv://admin:admin123@b337.j7vrqc4.mongodb.net/course-booking-API?retryWrites=true&w=majority&appName=B337",
	{
		useNewUrlParser : true,
		useUnifiedTopology : true
	}
);

// Prompts a message in the terminal once the connection is "open" and we are able to successfully connect to our database
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas"));

// [SECTION] Backend Routes
// http://localhost:4000/
app.use("/users", userRoutes);

// [SECTION] Server Gateway Response
if(require.main === module){

	app.listen(process.env.PORT || port, () => {
		console.log(`API is now online on port ${ process.env.PORT || port }`)
	})

}

module.exports = { 	app, 
					mongoose };