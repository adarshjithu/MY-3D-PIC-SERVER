"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// upload.ts
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3Client_1 = __importDefault(require("../../config/s3Client"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3Client_1.default,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const fileName = `images/${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        },
    }),
});
exports.default = upload;
