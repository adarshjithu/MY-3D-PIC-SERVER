import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../constants/customErrors";
import { verifyToken } from "../utils/token";
import { decode } from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies["my-3d-pic-access-token"];
    if (!accessToken) throw new UnAuthorizedError("Authorization token not found");

    const decoded = verifyToken(accessToken);
    if (!decoded?.data) throw new UnAuthorizedError("Authorization token expired");
   
     req.userId = decoded?.data?.userId
     req.role =  decoded?.data?.role;

    next();
};
