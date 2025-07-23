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
exports.CustomerController = void 0;
const statusCodes_1 = require("../../../constants/statusCodes");
const mongoose_1 = __importDefault(require("mongoose"));
const customErrors_1 = require("../../../constants/customErrors");
const { OK } = statusCodes_1.STATUS_CODES;
class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    // @desc Get all customers
    // @access User
    // @route GET /customer
    getAllCustomers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.customerService.getAllCustomers(req.query);
            res.status(OK).json({ success: true, message: "", data: result });
        });
    }
    // @desc  Change status
    // @access User
    // @route PATCH /customer/status/:customerId
    changeStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customerId } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(customerId))
                throw new customErrors_1.UnAuthorizedError("Invalid userId");
            const result = yield this.customerService.changeStatus(customerId);
            res.status(OK).json({ success: true, message: "", data: result });
        });
    }
    // @desc Block user
    // @access User
    // @route PATCH /customer/block/:customerId
    blockUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customerId } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(customerId))
                throw new customErrors_1.UnAuthorizedError("Invalid userId");
            const result = yield this.customerService.updateIsBlocked(customerId);
            res.status(OK).json({ success: true, message: "", data: result });
        });
    }
    // @desc Delete user
    // @access User
    // @route DELETE /customer/:customerId
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customerId } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(customerId))
                throw new customErrors_1.UnAuthorizedError("Invalid userId");
            const result = yield this.customerService.deleteUser(customerId);
            res.status(OK).json({ success: true, message: "Successfully deleted", data: result });
        });
    }
}
exports.CustomerController = CustomerController;
