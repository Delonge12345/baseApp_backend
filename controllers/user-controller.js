const userService = require('../service/user-service.js')
const {CLIENT_URL} = require('../constants')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error.js')
const fs = require('fs');
const db = require("../databasepg");

class UserController {

    async registration(req, res, next) {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {email, password, username, phone, registerAvatar} = req.body

            const userData = await userService.registration(email, password, username, phone, registerAvatar)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)


        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {

            const {loginData, password} = req.body
            const userData = await userService.login(loginData, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }


    async logout(req, res, next) {
        try {

            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)

        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {

            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(CLIENT_URL)

        } catch (e) {

            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            //undefined
            // const {refreshToken} = req.cookies

            const refreshToken = req.headers.authorization.split(' ')[1]

            const userData = await userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)


        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {

            const users = await userService.getAllUsers()
            return res.json(users)

        } catch (e) {
            next(e)
        }
    }

    async restoreRequest(req, res, next) {
        try {

            const {email} = req.body
            await userService.restorePassword(email)

            return res.status(200).json({
                success: true,
                status: 'OK'
            })

        } catch (e) {
            return res.status(500).json({
                success: false,
                status: 'ERROR'
            })
            next(e)
        }

    }

    async updateAvatar(req, res, next) {
        // try{
        //
        //     const {avatar} = req.body
        //
        //     //base64 avatar
        //
        //     await db.query('insert into authusers(avatar) values ($1)', [avatar])
        //
        //     return res.status(200).json({
        //         status: 'OK'
        //     })
        //
        // }catch(e) {
        //     next(e)
        // }
    }

    async restoreConfirm(req, res, next) {
        try {

            const {link, password} = req.body
            await userService.updatePassword(link, password)

            return res.status(200).json({
                success: true,
                status: 'OK'
            })

        } catch (e) {
            console.log('ERROR', e.message)
            return res.status(500).json({
                success: false,
                status: 'ERROR'
            })
            next(e)
        }
    }


}

module.exports = new UserController()