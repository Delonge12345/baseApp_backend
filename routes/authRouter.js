const Router = require('express')
const router = new Router()
const controller = require('../authController')
const {getUsers, register, login} = require("../controllers/auth");
const {registerValidation, loginValidation} = require("../validators/auth");
const {validationMiddleware} = require("../middlewares/validations-middleware");

// router.post('/register',controller.register)
// router.post('/login', controller.login)
// router.post('/users',controller.getUsers)
//


//checking

router.get('/get-users', getUsers)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)




// router.post('/logout', loginValidation, validationMiddleware, login)
// router.post('/refresh', refresh)
module.exports = router