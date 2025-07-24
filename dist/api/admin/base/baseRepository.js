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
exports.BaseproductRepository = void 0;
const baseModel_1 = __importDefault(require("../../../models/baseModel"));
const baseRepository_1 = require("../../../repositories/baseRepository");
class BaseproductRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(baseModel_1.default);
    }
    getAllBaseProducts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            filter.isDeleted = false;
            const baseProducts = yield baseModel_1.default.find(filter);
            const totalPages = yield baseModel_1.default.countDocuments();
            return { baseProducts, totalPages };
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield baseModel_1.default.findOne({ name: name });
        });
    }
    toggleSoftDelete(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield baseModel_1.default.findByIdAndUpdate(productId, [{ $set: { isDeleted: { $not: "$isDeleted" } } }], { new: true });
        });
    }
}
exports.BaseproductRepository = BaseproductRepository;
