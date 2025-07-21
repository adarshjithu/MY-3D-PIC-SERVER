"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("../api/user/auth/authRoutes"));
const addressRoutes_1 = __importDefault(require("../api/user/address/addressRoutes"));
const userRoutes = (0, express_1.default)();
userRoutes.use("/auth", authRoutes_1.default);
userRoutes.use("/address", addressRoutes_1.default);
exports.default = userRoutes;
