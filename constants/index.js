const {config} = require('dotenv')
config()

module.exports = {
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    SECRET: process.env.SECRET,
    JWT_ACCESS_SECRET : process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET,
    API_URL: process.env.API_URL,

    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_USER:process.env.SMTP_USER,
    SMTP_PORT:process.env.SMTP_PORT,
    SMTP_HOST:process.env.SMTP_HOST

}