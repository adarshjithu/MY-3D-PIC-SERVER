"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const customErrors_1 = require("../../../constants/customErrors");
const google_auth_library_1 = require("google-auth-library");
const userModel_1 = require("../../../models/userModel");
const userValidation_1 = require("../../../validation/userValidation");
const statusCodes_1 = require("../../../constants/statusCodes");
const { OK } = statusCodes_1.STATUS_CODES;
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    // @ desc Google authentication
    // @ route POST /auth/google
    // @access User
    googleAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const { credential } = req.body;
            if (!credential)
                throw new customErrors_1.NotFoundError("No credentials provided");
            const ticket = yield client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                throw new customErrors_1.UnAuthorizedError("Invalid google token");
            }
            const { email, given_name, family_name, picture, sub } = payload;
            const userObj = { email, firstName: given_name, lastName: family_name, image: picture, authType: userModel_1.AuthType.GOOGLE };
            const result = yield this.authService.googleAuth(userObj);
            const SECURE = process.env.ENVIRONMENT == "production";
            const ACCESS_TOKEN_MAX_AGE = 24 * 60 * 60 * 1000;
            const REFRESH_TOKEN_MAX_AGE = 48 * 60 * 60 * 1000;
            res.status(OK)
                .cookie("my-3d-pic-access-token", result === null || result === void 0 ? void 0 : result.accessToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: ACCESS_TOKEN_MAX_AGE })
                .cookie("my-3d-pic-refresh-token", result === null || result === void 0 ? void 0 : result.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: REFRESH_TOKEN_MAX_AGE,
            })
                .json({ success: true, message: "Google authentication successfully", data: result });
        });
    }
    // @ desc Logout user
    // @ route GET /auth/logout
    // @access User
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Clear the cookies
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: process.env.ENVIRONMENT === "production",
                sameSite: "none",
            })
                .clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.ENVIRONMENT === "production",
                sameSite: "none",
            })
                .status(OK)
                .json({ success: true, message: "User logged out successfully" });
        });
    }
    // @ desc  Register user
    // @ route POST /auth/register
    // @access User
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            userValidation_1.registrationSchema.parse(req.body);
            const result = yield this.authService.register(req.body);
            res.status(OK).json({
                success: true,
                message: "Registration link has been sent to your email. Please check your inbox to complete the registration.",
            });
        });
    }
    // @ desc  Verify link
    // @ route POST /auth/verify-link
    // @access User
    verifyLink(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { link } = req.params;
            if (!link)
                throw new customErrors_1.NotFoundError("Authentication link not found");
            const result = yield this.authService.verifyLink(link);
            const SECURE = process.env.ENVIRONMENT == "production";
            const ACCESS_TOKEN_MAX_AGE = 24 * 60 * 60 * 1000;
            const REFRESH_TOKEN_MAX_AGE = 48 * 60 * 60 * 1000;
            res.status(OK)
                .cookie("my-3d-pic-access-token", result === null || result === void 0 ? void 0 : result.accessToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: ACCESS_TOKEN_MAX_AGE })
                .cookie("my-3d-pic-refresh-token", result === null || result === void 0 ? void 0 : result.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: REFRESH_TOKEN_MAX_AGE,
            })
                .json({ success: true, message: "User registration successfull", data: result });
        });
    }
    // @ desc  User login
    // @ route POST /auth/login
    // @access User
    userLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body)
                throw new customErrors_1.BadRequestError("Invalid credentials");
            userValidation_1.loginValidation.parse(req.body);
            const result = yield this.authService.userLogin(req.body);
            const SECURE = process.env.ENVIRONMENT == "production";
            const ACCESS_TOKEN_MAX_AGE = 24 * 60 * 60 * 1000;
            const REFRESH_TOKEN_MAX_AGE = 48 * 60 * 60 * 1000;
            res.status(OK)
                .cookie("my-3d-pic-access-token", result === null || result === void 0 ? void 0 : result.accessToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: ACCESS_TOKEN_MAX_AGE })
                .cookie("my-3d-pic-refresh-token", result === null || result === void 0 ? void 0 : result.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: REFRESH_TOKEN_MAX_AGE,
            })
                .json({ success: true, message: "User login successfull", data: result });
        });
    }
    // @ desc  Update user profile
    // @ route POST /auth/profile
    // @access User
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const result = yield this.authService.updateProfile(userId, req.body);
            res.status(OK).json({ success: true, message: "User profile updated successfully", data: result });
        });
    }
    // @ desc  Update user profile
    // @ route PATCH /auth/profile/upload
    // @access User
    uploadProfileImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const image = req.file.location;
            const result = yield this.authService.updateProfileImage(userId, image);
            console.log(image);
            res.status(OK).json({ success: true, message: "User profile updated successfully", data: result });
        });
    }
}
exports.AuthController = AuthController;
