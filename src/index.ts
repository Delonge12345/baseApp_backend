import express from 'express'

const client = require("../databasepg");
const cors = require("cors");
const {PORT, CLIENT_URL} = require('../constants/index')
const authRoute = require('../routes/authRouter')
const cookieParser = require('cookie-parser')


// const authRouter = require('../authRouter')


export const app = express()



export const HTTP_CODES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,

}

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: CLIENT_URL, credentials: true}))
app.use('/api', authRoute)





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

// app.use('/auth',authRouter)










