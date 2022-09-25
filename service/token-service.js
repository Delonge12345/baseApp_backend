const jwt = require('jsonwebtoken')
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../constants')
const db = require("../databasepg");

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '30s'})
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, JWT_ACCESS_SECRET)
            return userData
        } catch (e) {

            return null

        }
    }

    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, JWT_REFRESH_SECRET)
            return userData
        } catch (e) {

            return null

        }
    }

    async saveToken(userId, refreshToken) {

        const {rows} = await db.query('Select * from authTokens WHERE user_id =$1', [
            userId
        ])


        if (rows.length) {
            const {rows: tokenData} = await db.query('UPDATE authTokens SET refreshtoken=$1 WHERE user_id=$2', [
                refreshToken,
                userId
            ])
            return tokenData
        }

        ////////////// ? Error
        await db.query('insert into authTokens(user_id, refreshtoken) values ($1 , $2)', [userId, refreshToken])
        const {rows: gotToken} = await db.query('Select * from authTokens WHERE refreshtoken =$1', [
            refreshToken
        ])
        return gotToken[0]
    }

    async removeToken(refreshToken) {
        db.query('delete from authTokens where refreshtoken=$1', [refreshToken])
    }

    async findToken(refreshToken) {
        const {rows} = await db.query('Select * from authTokens WHERE refreshtoken =$1', [
            refreshToken
        ])

        if (rows.length) {
            return true
        } else {
            return false
        }
    }


}

module.exports = new TokenService()