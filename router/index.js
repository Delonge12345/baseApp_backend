const Router = require('express').Router
const userController = require('../controllers/user-controller.js')
const {body} = require("express-validator");
const authMiddleware = require('../middlewares/auth-middleware.js')

const router = new Router()


const {registration, login, logout, refresh, activate, getUsers} = userController

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 10}),
    registration)


router.post('/login', login)
router.post('/logout', logout)
router.get('/activate/:link', activate)
router.get('/refresh', refresh)
router.get('/users',authMiddleware, getUsers)

module.exports = router
