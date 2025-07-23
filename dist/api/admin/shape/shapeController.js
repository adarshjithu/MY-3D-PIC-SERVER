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
exports.ShapeController = void 0;
const statusCodes_1 = require("../../../constants/statusCodes");
const customErrors_1 = require("../../../constants/customErrors");
const mongoose_1 = __importDefault(require("mongoose"));
const { OK, CREATED } = statusCodes_1.STATUS_CODES;
class ShapeController {
    constructor(shapeService) {
        this.shapeService = shapeService;
    }
    // @desc  Create shape
    // route  POST /shape
    // access User
    createShape(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.name)
                throw new customErrors_1.NotFoundError("Shape name is required");
            const image = req.file.location;
            if (!image)
                throw new customErrors_1.NotFoundError("Shape image not found");
            const result = yield this.shapeService.createShape({ image, name: req.body.name });
            res.status(CREATED).json({ success: true, message: "New shaped successfully added ✅", data: result });
        });
    }
    // @desc  Get all shapes
    // route  GET /shape
    // access User
    getAllShapes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.shapeService.getAllShapes(req.query);
            res.status(CREATED).json({ success: true, message: "", data: result });
        });
    }
    // @desc  Update shape
    // route  PUT /shape
    // access User
    updateShape(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shapeId } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(shapeId)) {
                throw new customErrors_1.BadRequestError("Shape id is not valid");
            }
            if (req.file && req.file.location) {
                const image = req.file.location;
                req.body.image = image; // ✅ Fix: actually assign image to req.body
            }
            const result = yield this.shapeService.updateShape(req.body, shapeId);
            res.status(200).json({
                success: true,
                message: "Shape successfully updated",
                data: result,
            });
        });
    }
    // @desc  Delete shape
    // route  DELETE /shape
    // access User
    deleteShape(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shapeId } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(shapeId))
                throw new customErrors_1.BadRequestError("Invalid shape Id");
            const result = yield this.shapeService.deleteShape(shapeId);
            res.status(CREATED).json({ success: true, message: "The shaped successfully deleted", data: result });
        });
    }
}
exports.ShapeController = ShapeController;
