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
exports.AddressService = void 0;
const customErrors_1 = require("../../../constants/customErrors");
class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    createAddress(addressData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (addressData === null || addressData === void 0 ? void 0 : addressData.isDefault) {
                yield this.addressRepository.updateIsDefault(userId);
            }
            return yield this.addressRepository.create(addressData);
        });
    }
    updateAddress(addressId, newAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.addressRepository.update(addressId, newAddress);
            if (!result)
                throw new customErrors_1.NotFoundError("Address not found");
            return result;
        });
    }
    deleteAddress(addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.addressRepository.delete(addressId);
            if (!result)
                throw new customErrors_1.NotFoundError("Address not found");
            return result;
        });
    }
    getAllAddress(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.addressRepository.getAllAddress(userId);
            return result;
        });
    }
}
exports.AddressService = AddressService;
