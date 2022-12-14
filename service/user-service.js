const db = require('../databasepg.js')
const {hash, compare} = require("bcryptjs");
const uuid = require('uuid')
const mailService = require('./mail-service.js')
const tokenService = require('./token-service.js')
const ApiError = require('../exceptions/api-error.js')


class UserService {
    async registration(email, password, username, phone, avatar) {
        console.log('DATA', email, phone)
        const {rows} = await db.query('Select * from authUsers WHERE email=$1 OR phone=$2', [
            email,
            phone
        ])

        if (rows.length) {
            throw ApiError.BadRequest('Пользователь уже существует')
        }

        const hashedPassword = await hash(password, 10)
        const activationLink = uuid.v4()

        //save user to database
        await db.query('insert into authUsers(email, password,username,phone,avatar,activationLink) values ($1 , $2, $3, $4, $5, $6)', [email, hashedPassword, username, phone, avatar, activationLink])

        const {rows: gotUser} = await db.query('Select * from authUsers WHERE email=$1', [
            email,
        ])

        let payload = {
            id: gotUser[0].user_id,
            email: gotUser[0].email
        }

        // await mailService.sendActivationMail(email, `${API_URL}/api/activate/${activationLink}`)

        const tokens = tokenService.generateToken(payload)
        await tokenService.saveToken(gotUser[0].user_id, tokens.refreshToken)

        return {
            ...tokens,
            email: gotUser[0].email,
            username: gotUser[0].username
        }
    }


    async login(login, password, phone) {
        const {rows} = await db.query('Select * from authUsers WHERE email =$1 OR phone =$1', [
            login
        ])

        if (!rows.length) {
            throw ApiError.BadRequest('Пользователь не найден')
        }

        const validPassword = await compare(password, rows[0].password)

        if (!validPassword) {
            throw ApiError.BadRequest('Некорректный пароль')
        }


        let payload = {
            id: rows[0].user_id,
            email: rows[0].email
        }

        const tokens = tokenService.generateToken(payload)
        const tokenData = await tokenService.saveToken(rows[0].user_id, tokens.refreshToken)


        return {
            ...tokens,
            status: "OK",
            email: rows[0].email
        }

    }


    async activate(activationLink) {
        const {rows} = await db.query('Select * from authUsers WHERE activationLink =$1', [
            activationLink
        ])
        if (!rows.length) {
            throw  ApiError.BadRequest('Incorrect activation link')
        }

        await db.query('UPDATE authUsers SET isActivated = $s1  WHERE activationLink =$2', [
            true,
            activationLink
        ])

    }


    async restorePassword(email) {
        const {rows} = await db.query('Select * from authUsers WHERE email =$1', [
            email
        ])

        if (!rows.length) {
            throw  ApiError.BadRequest('Пользователь не существует')
        }
        await mailService.sendActivationMail(email, `${process.env.CLIENT_URL}/restore/:${rows[0].activationlink}`)
    }

    async updatePassword(link, password) {


        console.log('password', password)
        const {rows} = await db.query('Select * from authusers WHERE activationlink =$1', [
            link
        ])

        if (!rows.length) {
            throw  ApiError.BadRequest('Пользователь не существует')
        }

        const hashedPassword = await hash(password, 10)

        await db.query('UPDATE authusers SET password = $1  WHERE activationlink =$2', [
            hashedPassword,
            link
        ])
    }


    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)


        const tokenFromDB = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        /******is it user_id here****/
        const {rows} = await db.query('Select * from authUsers WHERE user_id =$1', [
            userData.id
        ])
        let payload = {
            id: rows[0].user_id,
            email: rows[0].email
        }

        const tokens = tokenService.generateToken(payload)
        await tokenService.saveToken(rows[0].user_id, tokens.refreshToken)

        return {
            ...tokens,
            email: rows[0].email
        }
    }

    async getAllUsers() {
        const {rows} = await db.query('Select * from authUsers')
        return rows
    }
}

module.exports = new UserService()