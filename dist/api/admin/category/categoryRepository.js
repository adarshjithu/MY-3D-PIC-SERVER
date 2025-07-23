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
exports.CategoryRepository = void 0;
const categoryModel_1 = __importDefault(require("../../../models/categoryModel"));
const baseRepository_1 = require("../../../repositories/baseRepository");
class CategoryRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(categoryModel_1.default);
    }
    findAllCategories(query) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(query);
            const { search, sortKey, sortOrder, page, limit, status } = query;
            const filter = {};
            if (search)
                filter.name = { $regex: search, $options: "i" };
            if (status == 'active')
                filter.isActive = true;
            if (status == 'inactive')
                filter.isActive = false;
            const categories = yield categoryModel_1.default.find(filter).skip((parseInt(page) - 1) * 10).limit(parseInt(limit)).sort({ [sortKey]: sortOrder == 'asc' ? 1 : -1 });
            const totalPages = yield categoryModel_1.default.countDocuments();
            return { categories, totalPages };
        });
    }
}
exports.CategoryRepository = CategoryRepository;
