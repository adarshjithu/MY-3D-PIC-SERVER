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
exports.CategoryController = void 0;
const statusCodes_1 = require("../../../constants/statusCodes");
const { OK, CREATED } = statusCodes_1.STATUS_CODES;
const categoryValidation_1 = require("../../../validation/categoryValidation");
const mongoose_1 = __importDefault(require("mongoose"));
const customErrors_1 = require("../../../constants/customErrors");
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    // @desc Create category
    // @access User
    // @route POST /category
    createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            categoryValidation_1.CategorySchema.parse(req.body);
            const result = yield this.categoryService.createCategory(req.body);
            res.status(OK).json({ success: true, message: "New category successfully created", data: result });
        });
    }
    // @desc   Update category
    // @access User
    // @route  PUT /category
    updateCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryId } = req.params;
            console.log(categoryId);
            if (!mongoose_1.default.Types.ObjectId.isValid(categoryId))
                throw new customErrors_1.BadRequestError("Invalid categoryId");
            const result = yield this.categoryService.updateCategory(categoryId, req.body);
            res.status(OK).json({ success: true, message: "New category  successfully updated", data: result });
        });
    }
    // @desc   Delete category
    // @access User
    // @route  DELETE /category
    deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryId } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(categoryId))
                throw new customErrors_1.BadRequestError("Invalid categoryId");
            const result = yield this.categoryService.deleteCategory(categoryId);
            res.status(OK).json({ success: true, message: "New category  successfully deleted", data: result });
        });
    }
    // @desc   Get all categories
    // @access User
    // @route  GET /category
    findAllCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.categoryService.getAllCategories(req.query);
            res.status(OK).json({ success: true, message: "", data: result });
        });
    }
}
exports.CategoryController = CategoryController;
