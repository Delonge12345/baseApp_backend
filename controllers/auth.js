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
