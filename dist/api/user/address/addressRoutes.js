"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addressRepository_1 = require("./addressRepository");
const addressService_1 = require("./addressService");
const addressController_1 = require("./addressController");
const authenticate_1 = require("../../../middlewares/authenticate");
const asyncHandler_1 = __importDefault(require("../../../utils/asyncHandler"));
const addressRoutes = express_1.default.Router();
const addressRepository = new addressRepository_1.AddressRepository();
const addressService = new addressService_1.AddressService(addressRepository);
const controller = new addressController_1.AddresController(addressService);
addressRoutes.post('/', authenticate_1.authenticate, (0, asyncHandler_1.default)(controller.createAddress.bind(controller)));
addressRoutes.put('/:addressId', authenticate_1.authenticate, (0, asyncHandler_1.default)(controller.updateAddress.bind(controller)));
addressRoutes.delete('/:addressId', authenticate_1.authenticate, (0, asyncHandler_1.default)(controller.deleteAddress.bind(controller)));
addressRoutes.get('/', authenticate_1.authenticate, (0, asyncHandler_1.default)(controller.getAllAddress.bind(controller)));
exports.default = addressRoutes;
