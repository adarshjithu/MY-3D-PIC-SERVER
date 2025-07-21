"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleAuth = void 0;
const customErrors_1 = require("../constants/customErrors");
const roleAuth = (...allowedRoles) => (req, res, next) => {
    const role = req.role;
    const isAccess = allowedRoles.includes(role);
    if (isAccess) {
        next();
    }
    else {
        throw new customErrors_1.UnAuthorizedError("Unauthorized: Role not permitted");
    }
};
exports.roleAuth = roleAuth;
