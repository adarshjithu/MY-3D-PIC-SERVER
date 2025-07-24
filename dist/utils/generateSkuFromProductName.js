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
exports.generateSkuFromProductName = void 0;
const generateSkuFromProductName = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    const prefix = productName
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '') // remove spaces and special chars
        .slice(0, 5); // first 5 characters
    const timestamp = Date.now().toString().slice(-4); // last 4 digits
    const sku = `${prefix}-${timestamp}`; // e.g. "CRYST-4821"
    return sku;
});
exports.generateSkuFromProductName = generateSkuFromProductName;
