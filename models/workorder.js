const mongoose = require('mongoose'); // require same idea as import
const workOrderSchema = new mongoose.Schema({
vehicleBumperNumber: {
    type: String, // setting the only type you can write is a string
    required: true // ensure integrity of data demanding no blank fields
},
numinput: {
    type: Number, // setting the only type you can write is a number
    required: true // ensure integrity of data demanding no blank fields
},
mechanic: {
    type: String, // Mechanic Name
    required: true // require the field
},
partnumber: {
    type: String, // Mechanic Name
    required: false // don't require
},
date: {
    type: Date, // setting the only type that can be written is a date
    default: Date.now // grab default value of date and set ot field date
}
})
module.exports = mongoose.model('workOrder',workOrderSchema,'workOrders'); // export model to specific schema, details of schema, collections