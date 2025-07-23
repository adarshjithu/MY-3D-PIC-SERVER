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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseproductController = void 0;
const statusCodes_1 = require("../../../constants/statusCodes");
const customErrors_1 = require("../../../constants/customErrors");
const baseProductValidation_1 = require("../../../validation/baseProductValidation");
const { OK, CREATED } = statusCodes_1.STATUS_CODES;
class BaseproductController {
    constructor(baseProductService) {
        this.baseProductService = baseProductService;
    }
    // @desc   Create new base product
    // @access User
    // @route POST /base
    createBaseProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const thumbnail = (_c = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.location;
            const images = (_e = (_d = req.files) === null || _d === void 0 ? void 0 : _d.images) === null || _e === void 0 ? void 0 : _e.map((file) => file.location);
            if (!thumbnail)
                throw new customErrors_1.NotFoundError("Thumbnail image is required");
            baseProductValidation_1.baseProductSchema.parse(req.body);
        });
    }
    // @desc   Get all base products
    // @access User
    // @route GET /base
    getAllBaseProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.baseProductService.getAllBaseProducts(req.query);
            res.status(OK).json({ success: true, message: "", data: result });
        });
    }
}
exports.BaseproductController = BaseproductController;
