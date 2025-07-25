"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRepository_1 = require("./authRepository");
const authService_1 = require("./authService");
const authController_1 = require("./authController");
const asyncHandler_1 = __importDefault(require("../../../utils/asyncHandler"));
const authenticate_1 = require("../../../middlewares/authenticate");
const roleAuth_1 = require("../../../middlewares/roleAuth");
const userModel_1 = require("../../../models/userModel");
const upload_1 = __importDefault(require("../../../utils/image.ts/upload"));
const authRouter = express_1.default.Router();
const authRepository = new authRepository_1.AuthRepository();
const authService = new authService_1.AuthService(authRepository);
const controller = new authController_1.AuthController(authService);
authRouter.post('/google-auth', (0, asyncHandler_1.default)(controller.googleAuth.bind(controller)));
authRouter.get('/logout', (0, asyncHandler_1.default)(controller.logout.bind(controller)));
authRouter.post('/register', (0, asyncHandler_1.default)(controller.register.bind(controller)));
authRouter.post('/register/verify-link/:link', (0, asyncHandler_1.default)(controller.verifyLink.bind(controller)));
authRouter.post('/login', (0, asyncHandler_1.default)(controller.userLogin.bind(controller)));
authRouter.put('/profile', authenticate_1.authenticate, (0, roleAuth_1.roleAuth)(userModel_1.Roles.USER), (0, asyncHandler_1.default)(controller.updateProfile.bind(controller)));
authRouter.patch('/profile/upload', authenticate_1.authenticate, (0, roleAuth_1.roleAuth)(userModel_1.Roles.USER), upload_1.default.single('image'), (0, asyncHandler_1.default)(controller.uploadProfileImage.bind(controller)));
exports.default = authRouter;
