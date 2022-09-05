const Router = require('express')
const router = new Router()
const controller = require('../authController')

// router.post('/register',controller.register)
// router.post('/login', controller.login)
// router.post('/users',controller.getUsers)
//


//checking

router.get('/', (req, res) => {
    return res.send('working')
})
module.exports = router