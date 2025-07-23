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
exports.ShapeService = void 0;
const customErrors_1 = require("../../../constants/customErrors");
const deleteImageFromS3_1 = require("../../../utils/image.ts/deleteImageFromS3");
const extractKeyFromUrl_1 = require("../../../utils/image.ts/extractKeyFromUrl");
class ShapeService {
    constructor(shapeRepository) {
        this.shapeRepository = shapeRepository;
    }
    createShape(shapeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shapeRepository.create(shapeData);
        });
    }
    getAllShapes(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shapeRepository.getAllShapes(query);
        });
    }
    deleteShape(shapeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shapeRepository.delete(shapeId);
        });
    }
    updateShape(shapeData, shapeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const shape = yield this.shapeRepository.findById(shapeId);
            if (!shape)
                throw new customErrors_1.NotFoundError("Shape data is not found");
            if (shapeData === null || shapeData === void 0 ? void 0 : shapeData.image) {
                const imageKey = (0, extractKeyFromUrl_1.extractS3KeyFromUrl)(shape.image || "");
                (0, deleteImageFromS3_1.deleteS3Object)(imageKey || "");
            }
            console.log(shapeData, "asdfasdfasd");
            return yield this.shapeRepository.update(shapeId, shapeData);
        });
    }
}
exports.ShapeService = ShapeService;
