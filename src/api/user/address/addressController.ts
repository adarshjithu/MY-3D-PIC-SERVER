import { AddressService } from "./addressService";
import { STATUS_CODES } from "../../../constants/statusCodes";
import { NextFunction, Request, Response } from "express";
import { addressValidationSchema } from "../../../validation/addressValidation";
import mongoose from "mongoose";
import { BadRequestError } from "../../../constants/customErrors";
const { OK } = STATUS_CODES;

export class AddresController {
    constructor(private addressService: AddressService) {}

    // @desc Create address
    // route POST /address
    //access User
    async createAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.userId;
        console.log(userId);
        addressValidationSchema.parse(req.body);
        const newAddess = { ...req.body, userId: userId };
        const result = await this.addressService.createAddress(newAddess, userId);
        res.status(OK).json({ success: true, message: "Address saved successfull", data: result });
    }
    // @desc update address
    // route PUT /address
    //access User
    async updateAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { addressId } = req.params;
        console.log(addressId, req.body);
        if (!mongoose.Types.ObjectId.isValid(addressId)) throw new BadRequestError("Invalid ID format. Please provide a valid MongoDB ObjectId.");
        const result = await this.addressService.updateAddress(addressId, req.body);
        res.status(OK).json({ success: true, message: "Address successfully updated", data: result });
    }
    // @desc Create address
    // route DELETE /address
    //access User
    async deleteAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { addressId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(addressId)) throw new BadRequestError("Invalid ID format. Please provide a valid MongoDB ObjectId.");
        const result = await this.addressService.deleteAddress(addressId);
        res.status(OK).json({ success: true, message: "Address successfully deleted", data: result });
    }
    // @desc Get address
    // route GET /address
    //access User
    async getAllAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.userId;
        const result = await this.addressService.getAllAddress(userId);
        res.status(OK).json({ success: true, data: result });
    }
}
