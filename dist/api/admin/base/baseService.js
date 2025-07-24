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
exports.BaseProductService = void 0;
const slugify_1 = __importDefault(require("slugify"));
const generateSkuFromProductName_1 = require("../../../utils/generateSkuFromProductName");
const customErrors_1 = require("../../../constants/customErrors");
class BaseProductService {
    constructor(baseRepository) {
        this.baseRepository = baseRepository;
    }
    getAllBaseProducts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.baseRepository.getAllBaseProducts(query);
        });
    }
    deleteBaseProduct(baseProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            const base = yield this.baseRepository.findById(baseProductId);
            if (!base)
                throw new customErrors_1.NotFoundError("The product not found ");
            return yield this.baseRepository.toggleSoftDelete(baseProductId);
        });
    }
    // Create new base product
    createBaseProduct(thumbnail, images, baseData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generating sku automatically
            const sku = yield (0, generateSkuFromProductName_1.generateSkuFromProductName)(baseData === null || baseData === void 0 ? void 0 : baseData.name);
            // Generating slug automatically
            const slug = (0, slugify_1.default)(baseData.name, { lower: true, strict: true });
            // Meta keywords
            const keywordsArray = baseData === null || baseData === void 0 ? void 0 : baseData.metaKeywords.split(",").map((k) => k.trim());
            // Contructing new basedata
            const newBaseData = {
                name: baseData === null || baseData === void 0 ? void 0 : baseData.name,
                description: baseData === null || baseData === void 0 ? void 0 : baseData.description,
                price: { basePrice: parseInt(baseData === null || baseData === void 0 ? void 0 : baseData.basePrice), actualPrice: parseInt(baseData === null || baseData === void 0 ? void 0 : baseData.actualPrice) },
                inventory: {
                    sku: (baseData === null || baseData === void 0 ? void 0 : baseData.sku) ? baseData === null || baseData === void 0 ? void 0 : baseData.sku : sku,
                    lowStockThreshold: parseInt(baseData === null || baseData === void 0 ? void 0 : baseData.lowStockThreshold),
                    allowBackorder: baseData === null || baseData === void 0 ? void 0 : baseData.allowBackorder,
                    stock: parseInt(baseData === null || baseData === void 0 ? void 0 : baseData.quantity),
                    isTrackable: baseData === null || baseData === void 0 ? void 0 : baseData.isTrackable,
                },
                slug: slug,
                seo: {
                    metaTitle: baseData === null || baseData === void 0 ? void 0 : baseData.metaTitle,
                    metaDescription: baseData === null || baseData === void 0 ? void 0 : baseData.metaDescription,
                    metaKeywords: (baseData === null || baseData === void 0 ? void 0 : baseData.metaKeywords) ? keywordsArray : [],
                },
                isActive: (baseData === null || baseData === void 0 ? void 0 : baseData.isActive) == "true" ? true : false,
                images: images,
                thumbnail: thumbnail,
                isDeleted: false,
                size: JSON.parse(baseData === null || baseData === void 0 ? void 0 : baseData.size),
            };
            return yield this.baseRepository.create(newBaseData);
        });
    }
}
exports.BaseProductService = BaseProductService;
