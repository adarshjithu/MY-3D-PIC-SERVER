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
exports.CustomerService = void 0;
const customErrors_1 = require("../../../constants/customErrors");
class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    getAllCustomers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.customerRepository.getAllCustomers(query);
        });
    }
    changeStatus(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.customerRepository.updateStatus(customerId);
            if (!result)
                throw new customErrors_1.NotFoundError("Customer not found");
            return result;
        });
    }
    updateIsBlocked(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.customerRepository.updateIsBlocked(customerId);
            if (!result)
                throw new customErrors_1.NotFoundError("Customer not found");
            return result;
        });
    }
    deleteUser(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.customerRepository.softDelete(customerId);
            if (!result)
                throw new customErrors_1.NotFoundError("Customer not found");
            return result;
        });
    }
}
exports.CustomerService = CustomerService;
