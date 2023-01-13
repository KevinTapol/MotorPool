//*This function creates a database connection. It is exported and called within server.js

const mongoose = require('mongoose')

const connectDB = async () => { // wait for server to respond before proceed
    try {
        const conn = await mongoose.connect(
            process.env.DB_STRING
        ) // wait for success or fail connect from mongoose
        console.log(`MongoDB connected: ${conn.connection.host}`) // log out to console success message of connection to mongodb
    } catch (err) {
        console.log(err) // if fail log error
        process.exit(1)
    }
}

module.exports = connectDB // export the variable reference. Not calling the function! Function will be called in server.js