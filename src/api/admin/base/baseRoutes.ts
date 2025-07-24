import express from "express";
import { BaseproductRepository } from "./baseRepository";
import { BaseProductService } from "./baseService";
import { BaseproductController } from "./baseController";
import asyncHandler from "../../../utils/asyncHandler";
import upload from "../../../utils/image.ts/upload";

const baseRoutes = express.Router();

const baseProductRepository = new BaseproductRepository();
const baseProductService = new BaseProductService(baseProductRepository);
const controller = new BaseproductController(baseProductService);

baseRoutes.post(
    "/",
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 5 },
    ]),
    asyncHandler(controller.createBaseProduct.bind(controller))
);
baseRoutes.get("/", asyncHandler(controller.getAllBaseProducts.bind(controller)));
baseRoutes.delete("/:baseProductId", asyncHandler(controller.deleteBaseProduct.bind(controller)));

export default baseRoutes;
