"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.AuthType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define enum properly with string values
var AuthType;
(function (AuthType) {
    AuthType["MOBILE"] = "mobile";
    AuthType["GOOGLE"] = "google";
    AuthType["EMAIL"] = "email";
})(AuthType || (exports.AuthType = AuthType = {}));
var Roles;
(function (Roles) {
    Roles["USER"] = "user";
    Roles["ADMIN"] = "admin";
})(Roles || (exports.Roles = Roles = {}));
// Define user schema
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: false },
    countryCode: { type: Number, required: false },
    email: { type: String, required: true },
    country: { type: String },
    authType: {
        type: String,
        enum: Object.values(AuthType),
        required: true,
    },
    password: { type: String, required: false },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    role: { type: String, enum: Object.values(Roles), default: "user" },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
