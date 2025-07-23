import { NextFunction, Request, Response } from "express";
import { CustomerService } from "./customerService";
import { STATUS_CODES } from "../../../constants/statusCodes";
import mongoose from "mongoose";
import { UnAuthorizedError } from "../../../constants/customErrors";
const { OK } = STATUS_CODES;

export class CustomerController {
    constructor(private customerService: CustomerService) {}

    // @desc Get all customers
    // @access User
    // @route GET /customer
    async getAllCustomers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = await this.customerService.getAllCustomers(req.query);
        res.status(OK).json({ success: true, message: "", data: result });
    }
    // @desc  Change status
    // @access User
    // @route PATCH /customer/status/:customerId
    async changeStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {customerId} = req.params;
         
        if(!mongoose.Types.ObjectId.isValid(customerId)) throw new UnAuthorizedError("Invalid userId");
        const result = await this.customerService.changeStatus(customerId);
        res.status(OK).json({ success: true, message: "", data: result });
    }
    // @desc Block user
    // @access User
    // @route PATCH /customer/block/:customerId
    async blockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
         const {customerId} = req.params;
        if(!mongoose.Types.ObjectId.isValid(customerId)) throw new UnAuthorizedError("Invalid userId");
        const result =  await this.customerService.updateIsBlocked(customerId);
        res.status(OK).json({ success: true, message: "", data: result });
    }
    // @desc Delete user
    // @access User
    // @route DELETE /customer/:customerId
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
         const {customerId} = req.params;
        if(!mongoose.Types.ObjectId.isValid(customerId)) throw new UnAuthorizedError("Invalid userId");
        const result =  await this.customerService.deleteUser(customerId);
        res.status(OK).json({ success: true, message: "Successfully deleted", data: result });
    }
}
