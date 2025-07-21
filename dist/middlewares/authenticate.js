"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const customErrors_1 = require("../constants/customErrors");
const token_1 = require("../utils/token");
const authenticate = (req, res, next) => {
    var _a, _b;
    const accessToken = req.cookies["my-3d-pic-access-token"];
    if (!accessToken)
        throw new customErrors_1.UnAuthorizedError("Authorization token not found");
    const decoded = (0, token_1.verifyToken)(accessToken);
    if (!(decoded === null || decoded === void 0 ? void 0 : decoded.data))
        throw new customErrors_1.UnAuthorizedError("Authorization token expired");
    req.userId = (_a = decoded === null || decoded === void 0 ? void 0 : decoded.data) === null || _a === void 0 ? void 0 : _a.userId;
    req.role = (_b = decoded === null || decoded === void 0 ? void 0 : decoded.data) === null || _b === void 0 ? void 0 : _b.role;
    next();
};
exports.authenticate = authenticate;
