"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const baseRepository_1 = require("./baseRepository");
const baseService_1 = require("./baseService");
const baseController_1 = require("./baseController");
const asyncHandler_1 = __importDefault(require("../../../utils/asyncHandler"));
const upload_1 = __importDefault(require("../../../utils/image.ts/upload"));
const baseRoutes = express_1.default.Router();
const baseProductRepository = new baseRepository_1.BaseproductRepository();
const baseProductService = new baseService_1.BaseProductService(baseProductRepository);
const controller = new baseController_1.BaseproductController(baseProductService);
baseRoutes.post("/", upload_1.default.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
]), (0, asyncHandler_1.default)(controller.createBaseProduct.bind(controller)));
baseRoutes.get("/", (0, asyncHandler_1.default)(controller.getAllBaseProducts.bind(controller)));
exports.default = baseRoutes;
