"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerRepository_1 = require("./customerRepository");
const customerService_1 = require("./customerService");
const customerController_1 = require("./customerController");
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const customerRoutes = express_1.default.Router();
const customerRepository = new customerRepository_1.CustomerRepository();
const customerService = new customerService_1.CustomerService(customerRepository);
const controller = new customerController_1.CustomerController(customerService);
customerRoutes.get("/", (0, asyncHandler_1.default)(controller.getAllCustomers.bind(controller)));
customerRoutes.patch("/status/:customerId", (0, asyncHandler_1.default)(controller.changeStatus.bind(controller)));
customerRoutes.patch("/block/:customerId", (0, asyncHandler_1.default)(controller.blockUser.bind(controller)));
customerRoutes.delete("/:customerId", (0, asyncHandler_1.default)(controller.deleteUser.bind(controller)));
exports.default = customerRoutes;
