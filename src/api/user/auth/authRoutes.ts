
import express from 'express';
import { AuthRepository } from './authRepository';
import { AuthService } from './authService';
import { AuthController } from './authController';
import asyncHandler from '../../../utils/asyncHandler';
import { authenticate } from '../../../middlewares/authenticate';
import { roleAuth } from '../../../middlewares/roleAuth';
import { Roles } from '../../../models/userModel';
import upload from '../../../utils/image.ts/upload';
const authRouter = express.Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const controller = new AuthController(authService);


authRouter.post('/google-auth',asyncHandler(controller.googleAuth.bind(controller)));
authRouter.get('/logout',asyncHandler(controller.logout.bind(controller)));
authRouter.post('/register',asyncHandler(controller.register.bind(controller)));
authRouter.post('/register/verify-link/:link',asyncHandler(controller.verifyLink.bind(controller)));
authRouter.post('/login',asyncHandler(controller.userLogin.bind(controller)));
authRouter.put('/profile',authenticate,roleAuth(Roles.USER),asyncHandler(controller.updateProfile.bind(controller)));
authRouter.patch('/profile/upload',authenticate,roleAuth(Roles.USER), upload.single('image'),asyncHandler(controller.uploadProfileImage.bind(controller)));
export default authRouter;