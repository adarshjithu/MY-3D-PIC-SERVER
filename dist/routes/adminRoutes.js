"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerRoutes_1 = __importDefault(require("../api/admin/customer/customerRoutes"));
const shapeRoutes_1 = __importDefault(require("../api/admin/shape/shapeRoutes"));
const categoryRoutes_1 = __importDefault(require("../api/admin/category/categoryRoutes"));
const baseRoutes_1 = __importDefault(require("../api/admin/base/baseRoutes"));
const adminRoutes = (0, express_1.default)();
adminRoutes.use("/customer", customerRoutes_1.default);
adminRoutes.use("/shape", shapeRoutes_1.default);
adminRoutes.use("/category", categoryRoutes_1.default);
adminRoutes.use("/base", baseRoutes_1.default);
exports.default = adminRoutes;
