//todo - Declare Variables
const express = require("express");
const app = express();
// const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose"); // mongodb middleware
// const flash = require('connect-flash') // error messages npm install connect-flash
// const session = require('express-session') // enable sessions for error messages npm install express-session
// const MongoStore = require('connect-flash')(session)

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
// app.use(flash()) // set up flash error
// app.use(session({ // set up sessions for storing flash error messages
//     secret: process.evn.DB_STRING,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({
//         url: 'mongodb://localhost/Motorpool'
//     })
// }))

//*Required to properly parse form POST requests - sending data
app.use(express.urlencoded({ extended: true })); // parse requests from forms (user url inputs from forms)

//todo - Set Routes
app.use('/', homeRoutes) // if user goes to / for home route call declared variable above for pathing to routes folder and execute home.js
app.use('/edit', editRoutes)

//todo - Start Server
app.listen(process.env.PORT, () => console.log(`Server running on port ${PORT}`)); // listen for changes ex user n stuff on port