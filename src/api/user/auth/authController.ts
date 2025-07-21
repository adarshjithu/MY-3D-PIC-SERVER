import { NextFunction, Request, Response } from "express";
import { AuthService } from "./authService";
import { BadRequestError, NotFoundError, UnAuthorizedError } from "../../../constants/customErrors";
import { OAuth2Client } from "google-auth-library";
import User, { AuthType } from "../../../models/userModel";
import { loginValidation, registrationSchema } from "../../../validation/userValidation";

import { STATUS_CODES } from "../../../constants/statusCodes";
const { OK } = STATUS_CODES;

export class AuthController {
    constructor(private authService: AuthService) {}

    // @ desc Google authentication
    // @ route POST /auth/google
    // @access User
    async googleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const { credential } = req.body;

        if (!credential) throw new NotFoundError("No credentials provided");

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            throw new UnAuthorizedError("Invalid google token");
        }

        const { email, given_name, family_name, picture, sub } = payload;
        const userObj = { email, firstName: given_name, lastName: family_name, image: picture, authType: AuthType.GOOGLE };

        const result = await this.authService.googleAuth(userObj as any);

        const SECURE = process.env.ENVIRONMENT == "production";
        const ACCESS_TOKEN_MAX_AGE = 24 * 60 * 60 * 1000;
        const REFRESH_TOKEN_MAX_AGE = 48 * 60 * 60 * 1000;

        res.status(OK)
            .cookie("my-3d-pic-access-token", result?.accessToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: ACCESS_TOKEN_MAX_AGE })
            .cookie("my-3d-pic-refresh-token", result?.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: REFRESH_TOKEN_MAX_AGE,
            })
            .json({ success: true, message: "Google authentication successfully", data: result });
    }
    // @ desc Logout user
    // @ route GET /auth/logout
    // @access User
    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
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
    }
    // @ desc  Register user
    // @ route POST /auth/register
    // @access User
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        registrationSchema.parse(req.body);
        const result = await this.authService.register(req.body);
        res.status(OK).json({
            success: true,
            message: "Registration link has been sent to your email. Please check your inbox to complete the registration.",
        });
    }
    // @ desc  Verify link
    // @ route POST /auth/verify-link
    // @access User
    async verifyLink(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { link } = req.params;
        if (!link) throw new NotFoundError("Authentication link not found");

        const result = await this.authService.verifyLink(link as string);

        const SECURE = process.env.ENVIRONMENT == "production";
        const ACCESS_TOKEN_MAX_AGE = 24 * 60 * 60 * 1000;
        const REFRESH_TOKEN_MAX_AGE = 48 * 60 * 60 * 1000;

        res.status(OK)
            .cookie("my-3d-pic-access-token", result?.accessToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: ACCESS_TOKEN_MAX_AGE })
            .cookie("my-3d-pic-refresh-token", result?.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: REFRESH_TOKEN_MAX_AGE,
            })
            .json({ success: true, message: "User registration successfull", data: result });
    }
    // @ desc  User login
    // @ route POST /auth/login
    // @access User
    async userLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (!req.body) throw new BadRequestError("Invalid credentials");
        loginValidation.parse(req.body);

        const result = await this.authService.userLogin(req.body);

        const SECURE = process.env.ENVIRONMENT == "production";
        const ACCESS_TOKEN_MAX_AGE = 24 * 60 * 60 * 1000;
        const REFRESH_TOKEN_MAX_AGE = 48 * 60 * 60 * 1000;
        res.status(OK)
            .cookie("my-3d-pic-access-token", result?.accessToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: ACCESS_TOKEN_MAX_AGE })
            .cookie("my-3d-pic-refresh-token", result?.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: REFRESH_TOKEN_MAX_AGE,
            })
            .json({ success: true, message: "User login successfull", data: result });
    }
    // @ desc  Update user profile
    // @ route POST /auth/profile
    // @access User
    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.userId;
        const result = await this.authService.updateProfile(userId, req.body);
        res.status(OK).json({ success: true, message: "User profile updated successfully", data: result });
    }
    // @ desc  Update user profile
    // @ route PATCH /auth/profile/upload
    // @access User
    async uploadProfileImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.userId;
        const image =  (req.file as any).location;
        const result =  await this.authService.updateProfileImage(userId as string,image as string)
        console.log(image)
        res.status(OK).json({ success: true, message: "User profile updated successfully",data:result });
    }
}
