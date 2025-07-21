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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const customErrors_1 = require("../../../constants/customErrors");
const extractKeyFromUrl_1 = require("../../../utils/image.ts/extractKeyFromUrl");
const htmlGenerator_1 = require("../../../utils/htmlGenerator");
const password_1 = require("../../../utils/password");
const sendMail_1 = require("../../../utils/sendMail");
const token_1 = require("../../../utils/token");
const deleteImageFromS3_1 = require("../../../utils/image.ts/deleteImageFromS3");
class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    //----------------------------------- Google authentcation-----------------------------------------------------------
    googleAuth(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.authRepository.findByEmail(userData === null || userData === void 0 ? void 0 : userData.email);
            // If user exists, remove password and return tokens
            if (user) {
                if (!(user === null || user === void 0 ? void 0 : user.image)) {
                    yield this.authRepository.update(user === null || user === void 0 ? void 0 : user._id, { image: userData === null || userData === void 0 ? void 0 : userData.image });
                }
                const _a = user.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                const accessToken = (0, token_1.generateAccessToken)({ userId: user === null || user === void 0 ? void 0 : user._id, role: user.role });
                const refreshToken = (0, token_1.generateRefreshToken)({ userId: user === null || user === void 0 ? void 0 : user._id, role: user.role });
                return { accessToken, refreshToken, user: Object.assign(Object.assign({}, userWithoutPassword), { image: !user ? userData === null || userData === void 0 ? void 0 : userData.image : user === null || user === void 0 ? void 0 : user.image }) };
            }
            // Create new user with empty password (since it's a Google auth user)
            const newUser = yield this.authRepository.create(Object.assign(Object.assign({}, userData), { password: "" }));
            if (newUser) {
                const _b = newUser.toObject(), { password } = _b, userWithoutPassword = __rest(_b, ["password"]);
                const accessToken = (0, token_1.generateAccessToken)(newUser._id);
                const refreshToken = (0, token_1.generateRefreshToken)(newUser._id);
                return { accessToken, refreshToken, user: userWithoutPassword };
            }
            return null;
        });
    }
    //----------------------------------------------- User registration----------------------------------------------------
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(userData);
            const user = yield this.authRepository.findByEmail(userData === null || userData === void 0 ? void 0 : userData.email);
            if (user) {
                throw new customErrors_1.ConflictError("This email is already registered. Please log in or use a different email.");
            }
            const password = yield (0, password_1.hashPassword)(userData === null || userData === void 0 ? void 0 : userData.password);
            userData.password = password;
            delete userData["confirmPassword"];
            const encryptedData = (0, token_1.generateRegsterToken)(userData);
            const FRONTEND_URL = process.env.FRONTEND_URL;
            if (!FRONTEND_URL)
                throw new customErrors_1.NotFoundError("Frontend url is not defined");
            const link = `${FRONTEND_URL}/auth?token=${encryptedData}`;
            const content = (0, htmlGenerator_1.getRegistrationHtml)(link);
            const sendEmail = yield (0, sendMail_1.sendLinkToEmail)(userData === null || userData === void 0 ? void 0 : userData.email, "", content);
            if (!sendEmail)
                throw new customErrors_1.BadRequestError("Something went wrong, Failed to send email to the user, please retry");
            return;
        });
    }
    //---------------------------------------- Verify link send to users email------------------------------------------------
    verifyLink(link) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!link)
                throw new customErrors_1.NotFoundError("Registration link not found");
            const isLinkValid = (0, token_1.verifyRegisterToken)(link);
            if (!((_a = isLinkValid === null || isLinkValid === void 0 ? void 0 : isLinkValid.data) === null || _a === void 0 ? void 0 : _a.email)) {
                throw new customErrors_1.BadRequestError("Link expired or invalid.");
            }
            const userDataFromToken = isLinkValid.data;
            const existingUser = yield this.authRepository.findByEmail(userDataFromToken.email);
            if (existingUser) {
                const message = existingUser.authType === "google"
                    ? "This email is already registered with Google. Please sign in with Google."
                    : "This email is already registered. Please log in.";
                throw new customErrors_1.ConflictError(message);
            }
            const userToCreate = Object.assign(Object.assign({}, userDataFromToken), { authType: "email" });
            const newUser = yield this.authRepository.create(userToCreate);
            const accessToken = (0, token_1.generateAccessToken)({ userId: newUser === null || newUser === void 0 ? void 0 : newUser._id, role: newUser.role });
            const refreshToken = (0, token_1.generateRefreshToken)({ userId: newUser === null || newUser === void 0 ? void 0 : newUser._id, role: newUser.role });
            const _b = newUser.toObject(), { password } = _b, userWithoutPassword = __rest(_b, ["password"]);
            return { refreshToken, accessToken, user: userWithoutPassword };
        });
    }
    // -------------------------------------------User login-------------------------------------------------------------
    userLogin(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = credentials;
            const user = yield this.authRepository.findByEmail(email);
            if (!user)
                throw new customErrors_1.NotFoundError("No account found with this email");
            if (user === null || user === void 0 ? void 0 : user.isBlocked)
                throw new customErrors_1.UnAuthorizedError("Access denied. You were blocked by the admin");
            if (!(user === null || user === void 0 ? void 0 : user.password) && (user === null || user === void 0 ? void 0 : user.authType) == "google") {
                throw new customErrors_1.BadRequestError("This account was registered via Google. Please sign in using Google or use 'Forgot Password' to set a new password.");
            }
            const isPasswordValid = yield (0, password_1.comparePassword)(password, user === null || user === void 0 ? void 0 : user.password);
            if (!isPasswordValid)
                throw new customErrors_1.UnAuthorizedError("The password you entered in incurrect");
            const accessToken = (0, token_1.generateAccessToken)({ userId: user === null || user === void 0 ? void 0 : user._id, role: user.role });
            const refreshToken = (0, token_1.generateRefreshToken)({ userId: user === null || user === void 0 ? void 0 : user._id, role: user.role });
            user.password = "";
            return { accessToken, refreshToken, user };
        });
    }
    //------------------------------------------------ Update profile--------------------------------------------------------
    updateProfile(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.authRepository.update(userId, userData);
            if (!newUser)
                throw new customErrors_1.NotFoundError("User not found");
            return Object.assign(Object.assign({}, newUser), { password: "" });
        });
    }
    updateProfileImage(userId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authRepository.findById(userId);
            if (!user)
                throw new customErrors_1.NotFoundError("User not found");
            const imageKey = (0, extractKeyFromUrl_1.extractS3KeyFromUrl)(user.image || "");
            (0, deleteImageFromS3_1.deleteS3Object)(imageKey || '');
            const newUser = yield this.authRepository.update(userId, { image: image });
            if (!newUser)
                throw new customErrors_1.NotFoundError("User not found");
            return Object.assign(Object.assign({}, newUser), { password: "" });
        });
    }
}
exports.AuthService = AuthService;
