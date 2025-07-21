import { BadRequestError, ConflictError, NotFoundError, UnAuthorizedError } from "../../../constants/customErrors";
import { IUser } from "../../../types/user";
import { extractS3KeyFromUrl } from "../../../utils/image.ts/extractKeyFromUrl";
import { getRegistrationHtml } from "../../../utils/htmlGenerator";
import { comparePassword, hashPassword } from "../../../utils/password";
import { sendLinkToEmail } from "../../../utils/sendMail";
import { generateAccessToken, generateRefreshToken, generateRegsterToken, verifyRegisterToken } from "../../../utils/token";
import { AuthRepository } from "./authRepository";
import { deleteS3Object } from "../../../utils/image.ts/deleteImageFromS3";

export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    //----------------------------------- Google authentcation-----------------------------------------------------------
    async googleAuth(userData: IUser): Promise<any | null> {
        let user = await this.authRepository.findByEmail(userData?.email);

        // If user exists, remove password and return tokens
        if (user) {
            
            if (!user?.image) {
                await this.authRepository.update(user?._id, { image: userData?.image });
            }
            const { password, ...userWithoutPassword } = (user as any).toObject();
            const accessToken = generateAccessToken({ userId: user?._id, role: user.role });
            const refreshToken = generateRefreshToken({ userId: user?._id, role: user.role });

            return { accessToken, refreshToken, user: { ...userWithoutPassword, image: !user?userData?.image:user?.image } };
        }

        // Create new user with empty password (since it's a Google auth user)
        const newUser = await this.authRepository.create({ ...userData, password: "" });

        if (newUser) {
            const { password, ...userWithoutPassword } = (newUser as any).toObject();
            const accessToken = generateAccessToken(newUser._id);
            const refreshToken = generateRefreshToken(newUser._id);

            return { accessToken, refreshToken, user: userWithoutPassword };
        }

        return null;
    }

    //----------------------------------------------- User registration----------------------------------------------------
    async register(userData: any): Promise<any> {
        console.log(userData);
        const user = await this.authRepository.findByEmail(userData?.email);
        if (user) {
            throw new ConflictError("This email is already registered. Please log in or use a different email.");
        }
        const password = await hashPassword(userData?.password);
        userData.password = password;
        delete userData["confirmPassword"];
        const encryptedData = generateRegsterToken(userData);
        const FRONTEND_URL = process.env.FRONTEND_URL;
        if (!FRONTEND_URL) throw new NotFoundError("Frontend url is not defined");
        const link = `${FRONTEND_URL}/auth?token=${encryptedData}`;
        const content = getRegistrationHtml(link);
        const sendEmail = await sendLinkToEmail(userData?.email, "", content);
        if (!sendEmail) throw new BadRequestError("Something went wrong, Failed to send email to the user, please retry");
        return;
    }

    //---------------------------------------- Verify link send to users email------------------------------------------------
    async verifyLink(link: string): Promise<any> {
        if (!link) throw new NotFoundError("Registration link not found");

        const isLinkValid = verifyRegisterToken(link);
        if (!isLinkValid?.data?.email) {
            throw new BadRequestError("Link expired or invalid.");
        }

        const userDataFromToken = isLinkValid.data;

        const existingUser = await this.authRepository.findByEmail(userDataFromToken.email);
        if (existingUser) {
            const message =
                existingUser.authType === "google"
                    ? "This email is already registered with Google. Please sign in with Google."
                    : "This email is already registered. Please log in.";
            throw new ConflictError(message);
        }

        const userToCreate = {
            ...userDataFromToken,
            authType: "email",
        };

        const newUser = await this.authRepository.create(userToCreate);

        const accessToken = generateAccessToken({ userId: newUser?._id, role: newUser.role });
        const refreshToken = generateRefreshToken({ userId: newUser?._id, role: newUser.role });

        const { password, ...userWithoutPassword } = (newUser as any).toObject();
        return { refreshToken, accessToken, user: userWithoutPassword };
    }

    // -------------------------------------------User login-------------------------------------------------------------

    async userLogin(credentials: { email: string; password: string }): Promise<any> {
        const { email, password } = credentials;
        const user = await this.authRepository.findByEmail(email);
        if (!user) throw new NotFoundError("No account found with this email");
        if (user?.isBlocked) throw new UnAuthorizedError("Access denied. You were blocked by the admin");

        if (!user?.password && user?.authType == "google") {
            throw new BadRequestError(
                "This account was registered via Google. Please sign in using Google or use 'Forgot Password' to set a new password."
            );
        }

        const isPasswordValid = await comparePassword(password, user?.password);
        if (!isPasswordValid) throw new UnAuthorizedError("The password you entered in incurrect");

        const accessToken = generateAccessToken({ userId: user?._id, role: user.role });
        const refreshToken = generateRefreshToken({ userId: user?._id, role: user.role });
        user.password = "";

        return { accessToken, refreshToken, user };
    }

    //------------------------------------------------ Update profile--------------------------------------------------------
    async updateProfile(userId: string, userData: IUser): Promise<IUser | null> {
        const newUser = await this.authRepository.update(userId, userData);
        if (!newUser) throw new NotFoundError("User not found");
        return { ...newUser, password: "" };
    }
    async updateProfileImage(userId: string, image: string): Promise<IUser | null> {
        const user = await this.authRepository.findById(userId);

        if (!user) throw new NotFoundError("User not found");
        const imageKey = extractS3KeyFromUrl(user.image || "");
        deleteS3Object(imageKey||'');
        const newUser = await this.authRepository.update(userId, { image: image });
        if (!newUser) throw new NotFoundError("User not found");
        return { ...newUser, password: "" };
    }
}
