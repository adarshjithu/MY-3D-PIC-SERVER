import { CategoryService } from "./categoryService";
import { STATUS_CODES } from "../../../constants/statusCodes";
const { OK, CREATED } = STATUS_CODES;
import { NextFunction, Request, Response } from "express";
import { CategorySchema } from "../../../validation/categoryValidation";
import mongoose from "mongoose";
import { BadRequestError } from "../../../constants/customErrors";
import slugify from "slugify";

export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    // @desc Create category
    // @access User
    // @route POST /category
    async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        CategorySchema.parse(req.body);
    
        const result = await this.categoryService.createCategory(req.body);
        res.status(OK).json({success:true,message:"New category successfully created",data:result})
    }
    // @desc   Update category
    // @access User
    // @route  PUT /category
    async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {categoryId} = req.params;
        console.log(categoryId)
        if(!mongoose.Types.ObjectId.isValid(categoryId)) throw new BadRequestError("Invalid categoryId")
        const result = await this.categoryService.updateCategory(categoryId,req.body);
        res.status(OK).json({success:true,message:"New category  successfully updated",data:result})
    }
    // @desc   Delete category
    // @access User
    // @route  DELETE /category
    async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {categoryId} = req.params;
        if(!mongoose.Types.ObjectId.isValid(categoryId)) throw new BadRequestError("Invalid categoryId")
        const result = await this.categoryService.deleteCategory(categoryId as string);
        res.status(OK).json({success:true,message:"New category  successfully deleted",data:result})
    }
    // @desc   Get all categories
    // @access User
    // @route  GET /category
    async findAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
      
        const result = await this.categoryService.getAllCategories(req.query);
        res.status(OK).json({success:true,message:"",data:result});

    }
}
