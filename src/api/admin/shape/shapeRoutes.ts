import express from "express";
import { ShapeRepository } from "./shapeRepository";
import { ShapeService } from "./shapeService";
import { ShapeController } from "./shapeController";
import asyncHandler from "../../../utils/asyncHandler";
import upload from "../../../utils/image.ts/upload";

const shapeRouter = express.Router();
const shapeRepository = new ShapeRepository();
const shapeService = new ShapeService(shapeRepository);
const controller = new ShapeController(shapeService);

shapeRouter.post("/", upload.single("image"), asyncHandler(controller.createShape.bind(controller)));
shapeRouter.put("/:shapeId", upload.single("image"), asyncHandler(controller.updateShape.bind(controller)));
shapeRouter.delete("/:shapeId", asyncHandler(controller.deleteShape.bind(controller)));
shapeRouter.get("/", asyncHandler(controller.getAllShapes.bind(controller)));

export default shapeRouter;
