//todo - Declare Variables
const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose"); // mongodb middleware

//*Import functions/routes
const connectDB = require("./config/database")
const homeRoutes = require("./routes/home") // direct traffic to routes folder home.js
const editRoutes = require("./routes/edit")

require('dotenv').config({path: './config/.env'}) // require environment variables in the file path

//todo - Connect to Database
connectDB() // call function in the file database.js

//todo - Set Middleware
app.set("view engine", "ejs"); // front end views
app.use(express.static('public')) // allows static (don't change) files into a folder called public 

//*Required to properly parse form POST requests - sending data
app.use(express.urlencoded({ extended: true })); // parse requests from forms (user url inputs from forms)

//todo - Set Routes
app.use('/', homeRoutes) // if user goes to / for home route call declared variable above for pathing to routes folder and execute home.js
app.use('/edit', editRoutes)

//todo - Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // listen for changes ex user n stuff on port