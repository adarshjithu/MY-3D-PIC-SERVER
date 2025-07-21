"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const addressSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        trim: true,
        default: '',
    },
    street: {
        type: String,
        required: true,
        trim: true,
    },
    apartment: {
        type: String,
        trim: true,
        default: '',
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    zip: {
        type: String,
        required: true,
        trim: true,
    },
    province: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        default: '',
    },
    type: {
        type: String,
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Address = mongoose_1.default.model('Address', addressSchema);
exports.default = Address;
