"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRegisterToken = exports.generateRegsterToken = exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Access token
const generateAccessToken = (payload) => {
    const token = jsonwebtoken_1.default.sign({ data: payload }, `${process.env.JWT_SECRET}`, { expiresIn: `10h` });
    return token;
};
exports.generateAccessToken = generateAccessToken;
const verifyToken = (token) => {
    try {
        const secret = `${process.env.JWT_SECRET}`;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        console.log("Error while jwt token verification");
        return null;
    }
};
exports.verifyToken = verifyToken;
// Refresh token
const generateRefreshToken = (payload) => {
    const token = jsonwebtoken_1.default.sign({ data: payload }, `${process.env.JWT_SECRET}`, { expiresIn: `48h` });
    return token;
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    try {
        const secret = `${process.env.JWT_SECRET}`;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        return null;
        console.log(error);
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
// Register token
const generateRegsterToken = (payload) => {
    const token = jsonwebtoken_1.default.sign({ data: payload }, `${process.env.JWT_SECRET}`, { expiresIn: `1h` });
    return token;
};
exports.generateRegsterToken = generateRegsterToken;
const verifyRegisterToken = (token) => {
    try {
        const secret = `${process.env.JWT_SECRET}`;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        console.log("Error while jwt token verification");
        return null;
    }
};
exports.verifyRegisterToken = verifyRegisterToken;
