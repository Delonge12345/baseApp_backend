"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const { PORT } = require('../constants/index');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('../middlewares/error-middleware.js');
const router = require('../router/index');
exports.app = (0, express_1.default)();
//middlewares
exports.app.use(express_1.default.json());
exports.app.use(cookieParser());
exports.app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
exports.app.use('/api', router);
exports.app.use(errorMiddleware);
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
