import { ShapeService } from "./shapeService";
import { STATUS_CODES } from "../../../constants/statusCodes";
import { BadRequestError, NotFoundError } from "../../../constants/customErrors";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const { OK, CREATED } = STATUS_CODES;

export class ShapeController {
    constructor(private shapeService: ShapeService) {}

    // @desc  Create shape
    // route  POST /shape
    // access User
    async createShape(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (!req.body.name) throw new NotFoundError("Shape name is required");
        const image = (req.file as any).location;
        if (!image) throw new NotFoundError("Shape image not found");
        const result = await this.shapeService.createShape({ image, name: req.body.name });
        res.status(CREATED).json({ success: true, message: "New shaped successfully added ✅", data: result });
    }
    // @desc  Get all shapes
    // route  GET /shape
    // access User
    async getAllShapes(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = await this.shapeService.getAllShapes(req.query);
        res.status(CREATED).json({ success: true, message: "", data: result });
    }
    // @desc  Update shape
    // route  PUT /shape
    // access User
    async updateShape(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { shapeId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(shapeId)) {
            throw new BadRequestError("Shape id is not valid");
        }

        if (req.file && (req.file as any).location) {
            const image = (req.file as any).location;
            req.body.image = image; // ✅ Fix: actually assign image to req.body
        }

        const result = await this.shapeService.updateShape(req.body, shapeId);

        res.status(200).json({
            success: true,
            message: "Shape successfully updated",
            data: result,
        });
    }

    // @desc  Delete shape
    // route  DELETE /shape
    // access User
    async deleteShape(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {shapeId} = req.params;
        if(!mongoose.Types.ObjectId.isValid(shapeId)) throw new BadRequestError("Invalid shape Id")
        const result = await this.shapeService.deleteShape(shapeId);
        res.status(CREATED).json({ success: true, message: "The shaped successfully deleted", data: result });
    }
}
