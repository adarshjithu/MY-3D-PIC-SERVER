import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../constants/customErrors";

export const roleAuth =
    (...allowedRoles: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        const role = req.role;

        const isAccess = allowedRoles.includes(role);
        if (isAccess) {
            next();
        } else {
            throw new UnAuthorizedError("Unauthorized: Role not permitted");
        }
    };
