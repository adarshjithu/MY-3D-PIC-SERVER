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
exports.CategoryService = void 0;
const slugify_1 = __importDefault(require("slugify"));
const customErrors_1 = require("../../../constants/customErrors");
class CategoryService {
    constructor(categoryRepository, productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }
    createCategory(categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const slug = (0, slugify_1.default)(categoryData.name, { lower: true, strict: true });
            const newCategory = Object.assign(Object.assign({}, categoryData), { slug });
            return yield this.categoryRepository.create(newCategory);
        });
    }
    updateCategory(categoryId, categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.update(categoryId, categoryData);
            if (!category)
                throw new customErrors_1.NotFoundError("Category data not found");
            return category;
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productCount = yield this.productRepository.findAllProductCountByCategoryId(categoryId);
            if (productCount > 0)
                throw new customErrors_1.BadRequestError(`Cannot delete this category because products are still assigned to it. Please remove or reassign those products before deleting the category.`);
            const category = yield this.categoryRepository.delete(categoryId);
            if (!category)
                throw new customErrors_1.NotFoundError("Category data not found");
            return category;
        });
    }
    getAllCategories(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.findAllCategories(query);
        });
    }
}
exports.CategoryService = CategoryService;
