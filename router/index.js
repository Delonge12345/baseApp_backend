const Router = require('express').Router
const userController = require('../controllers/user-controller.js')
const {body} = require("express-validator");
const authMiddleware = require('../middlewares/auth-middleware.js')

const router = new Router()


const {registration, login, logout, refresh, activate, getUsers, updateAvatar,restoreRequest,restoreConfirm} = userController

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 10}),
    registration)


router.post('/login', login)
router.post('/logout', logout)
router.get('/activate/:link', activate)
router.post('/refresh', refresh)
router.get('/users',authMiddleware, getUsers)
router.post('/setAvatar',updateAvatar)

router.post('/restoreRequest',restoreRequest)


router.post('/restoreConfirm',restoreConfirm)




module.exports = router
