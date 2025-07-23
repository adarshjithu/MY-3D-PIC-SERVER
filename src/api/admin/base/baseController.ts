import { NextFunction, Request, Response } from "express";
import { BaseProductService } from "./baseService";
import { STATUS_CODES } from "../../../constants/statusCodes";
import { NotFoundError } from "../../../constants/customErrors";
import { baseProductSchema } from "../../../validation/baseProductValidation";
const { OK, CREATED } = STATUS_CODES;

export class BaseproductController {
    constructor(private baseProductService: BaseProductService) {}

    // @desc   Create new base product
    // @access User
    // @route POST /base
    async createBaseProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const thumbnail = (req.files as any)?.thumbnail?.[0]?.location;
        const images = (req.files as any)?.images?.map((file: any) => file.location);
        if (!thumbnail) throw new NotFoundError("Thumbnail image is required");

         baseProductSchema.parse(req.body);
    }
    // @desc   Get all base products
    // @access User
    // @route GET /base
    async getAllBaseProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
       
        const result = await this.baseProductService.getAllBaseProducts(req.query);
        res.status(OK).json({ success: true, message: "", data: result });
    }
}
