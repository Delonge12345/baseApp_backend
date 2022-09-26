import express from 'express'

const cors = require("cors");
const {PORT} = require('../constants/index')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('../middlewares/error-middleware.js')
const router = require('../router/index')


export const app = express()

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router)
app.use(errorMiddleware)

const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The app is running at port ${PORT}`)
        })
    }catch(err) {
        console.log('Error', err)
    }
}

appStart()










