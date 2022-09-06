const {config} = require('dotenv')
config()

module.exports = {
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    SECRET: process.env.SECRET,
    JWT_ACCESS_SECRET : process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET,
}