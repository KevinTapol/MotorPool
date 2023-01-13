//*Handles initial GET request for the homepage
//*Handles POST method  request for adding a new item

const express = require('express')
const router = express.Router() // built in express method called Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex) //get read only route when user types / for home page in controller folder function named getIndex
router.post('/new', homeController.createItem) //post create new item in controller folder function name createItem


module.exports = router