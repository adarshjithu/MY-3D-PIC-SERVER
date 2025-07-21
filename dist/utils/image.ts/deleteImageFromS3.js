"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteS3Object = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3Client_1 = __importDefault(require("../../config/s3Client"));
const deleteS3Object = (key) => __awaiter(void 0, void 0, void 0, function* () {
    if (!key)
        return;
    try {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME, // "decimaltechnologiesbucket"
            Key: key, // e.g., "images/1752995306250-banner.png"
        });
        yield s3Client_1.default.send(command);
        console.log(`✅ Deleted from S3: ${key}`);
    }
    catch (error) {
        console.error(`❌ Failed to delete S3 object: ${key}`, error);
    }
});
exports.deleteS3Object = deleteS3Object;
