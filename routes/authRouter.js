const Router = require('express')
const router = new Router()
const controller = require('../authController')
const {getUsers} = require("../controllers/auth");

// router.post('/register',controller.register)
// router.post('/login', controller.login)
// router.post('/users',controller.getUsers)
//


//checking

router.get('/get-users', getUsers)
module.exports = router