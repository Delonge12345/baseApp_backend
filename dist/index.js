"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_CODES = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const client = require("../databasepg");
const cors = require("cors");
const { PORT, CLIENT_URL } = require('../constants/index');
const authRout = require('../routes/authRouter');
// const authRouter = require('../authRouter')
exports.app = (0, express_1.default)();
exports.HTTP_CODES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
};
//middlewares
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
exports.app.use(cors({ origin: CLIENT_URL, credentials: true }));
exports.app.use('/api', authRout);
const appStart = () => {
    try {
        exports.app.listen(PORT, () => {
            console.log(`The app is running at port ${PORT}`);
        });
    }
    catch (err) {
        console.log('Error', err);
    }
};
appStart();
// app.use('/auth',authRouter)
