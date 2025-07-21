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
exports.AddresController = void 0;
const statusCodes_1 = require("../../../constants/statusCodes");
const addressValidation_1 = require("../../../validation/addressValidation");
const mongoose_1 = __importDefault(require("mongoose"));
const customErrors_1 = require("../../../constants/customErrors");
const { OK } = statusCodes_1.STATUS_CODES;
class AddresController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    // @desc Create address
    // route POST /address
    //access User
    createAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            console.log(userId);
            addressValidation_1.addressValidationSchema.parse(req.body);
            const newAddess = Object.assign(Object.assign({}, req.body), { userId: userId });
            const result = yield this.addressService.createAddress(newAddess, userId);
            res.status(OK).json({ success: true, message: "Address saved successfull", data: result });
        });
    }
    // @desc update address
    // route PUT /address
    //access User
    updateAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { addressId } = req.params;
            console.log(addressId, req.body);
            if (!mongoose_1.default.Types.ObjectId.isValid(addressId))
                throw new customErrors_1.BadRequestError("Invalid ID format. Please provide a valid MongoDB ObjectId.");
            const result = yield this.addressService.updateAddress(addressId, req.body);
            res.status(OK).json({ success: true, message: "Address successfully updated", data: result });
        });
    }
    // @desc Create address
    // route DELETE /address
    //access User
    deleteAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { addressId } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(addressId))
                throw new customErrors_1.BadRequestError("Invalid ID format. Please provide a valid MongoDB ObjectId.");
            const result = yield this.addressService.deleteAddress(addressId);
            res.status(OK).json({ success: true, message: "Address successfully deleted", data: result });
        });
    }
    // @desc Get address
    // route GET /address
    //access User
    getAllAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const result = yield this.addressService.getAllAddress(userId);
            res.status(OK).json({ success: true, data: result });
        });
    }
}
exports.AddresController = AddresController;
