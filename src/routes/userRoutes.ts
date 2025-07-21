import express from "express";
import authRouter from "../api/user/auth/authRoutes";
import addressRoutes from "../api/user/address/addressRoutes";

const userRoutes = express();
userRoutes.use("/auth", authRouter);
userRoutes.use("/address",addressRoutes)

export default userRoutes;
