"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middlewares/errorHandler");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const corsConfig_1 = require("./config/corsConfig");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, corsConfig_1.corsConfig)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(`/v1`, userRoutes_1.default);
app.use(`/v1/admin`, adminRoutes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
