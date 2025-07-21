import express from "express";
import cors from 'cors'
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import { corsConfig } from "./config/corsConfig";
import cookieParser from 'cookie-parser'
const app = express();
app.use(corsConfig())
app.use(express.json());
app.use(cookieParser())
app.use(`/v1`,userRoutes);
app.use(`/v1/admin`,adminRoutes)
app.use(errorHandler);
export default app;
