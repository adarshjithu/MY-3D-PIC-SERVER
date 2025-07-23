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
exports.CustomerRepository = void 0;
const userModel_1 = __importDefault(require("../../../models/userModel"));
const baseRepository_1 = require("../../../repositories/baseRepository");
class CustomerRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(userModel_1.default);
    }
    getAllCustomers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search, status, blocked, sortKey = "createdAt", sortOrder = "desc" } = query;
            const filter = {};
            if (search) {
                filter.name = { $regex: search, $options: "i" };
            }
            if (status) {
                filter.isActive = status === "active";
            }
            if (blocked) {
                filter.isBlocked = blocked === "blocked";
            }
            const sortDirection = sortOrder === "asc" ? 1 : -1;
            const result = yield userModel_1.default.find(filter)
                .sort({ [sortKey]: sortDirection })
                .lean();
            const totalPages = yield userModel_1.default.countDocuments();
            return { users: result, totalPages: totalPages };
        });
    }
    updateStatus(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_1.default.findByIdAndUpdate(customerId, [
                {
                    $set: {
                        isActive: { $not: "$isActive" },
                    },
                },
            ], { new: true });
        });
    }
    updateIsBlocked(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_1.default.findByIdAndUpdate(customerId, [
                {
                    $set: {
                        isBlocked: { $not: "$isBlocked" },
                    },
                },
            ], { new: true });
        });
    }
    softDelete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_1.default.findByIdAndUpdate(userId, [{ $set: { isDeleted: { $not: "$isDeleted" } } }], { new: true });
        });
    }
}
exports.CustomerRepository = CustomerRepository;
