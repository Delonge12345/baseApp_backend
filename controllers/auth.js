const db = require('../databasepg.js')
const {hash} = require('bcryptjs')
const {sign} = require('jsonwebtoken')
const {SECRET} = require('../constants')

exports.getUsers = async (req, res) => {
    try {
        const {rows} = await db.query('select user_id, email from users')

        return res.status(200).json({
            success: true,
            users: rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}


exports.register = async (req, res) => {
    try {
        const {email, password, username} = req.body
        const hashedPassword = await hash(password, 10)
        await db.query('insert into authusers(email, password,username) values ($1 , $2, $3)', [email, hashedPassword, username])

        return res.status(201).json({
            success: true,
            message: 'Регистрация прошла успешно'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}


exports.login = async (req, res) => {
    let user = req.user
    let payload = {
        id: user.user_id,
        email: user.email
    }

    try {

        const token = await sign(payload, SECRET)

        return res.status(200).cookie('token', token, {httpOnly: true}).json({
            success: true,
            message: 'Вход прошел успешно'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}


// exports.logout = async (req, res, next) => {
//
//
//     try {
//         const {refreshToken} = req.cookies
//         const token = await userService.logout(refreshToken)
//         res.clearCookie('refreshToken')
//         return res.json(token)
//
//     } catch (error) {
//         next(error)
//     }
// }
//
//
//
//
// exports.refresh = async (req, res, next) => {
//
//
//     try {
//         const {refreshToken} = req.cookies
//         const userData = await userService.refresh(refreshToken)
//         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*1000, httpOnly:true})
//         return res.json(userData)
//
//     } catch (error) {
//       next(e)
//     }
// }