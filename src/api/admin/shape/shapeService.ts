import { NotFoundError } from "../../../constants/customErrors";
import { IShape } from "../../../types/IShape";
import { deleteS3Object } from "../../../utils/image.ts/deleteImageFromS3";
import { extractS3KeyFromUrl } from "../../../utils/image.ts/extractKeyFromUrl";
import { ShapeRepository } from "./shapeRepository";

export class ShapeService {
    constructor(private shapeRepository: ShapeRepository) {}

    async createShape(shapeData: { name: string; image: string }): Promise<IShape | null> {
        return await this.shapeRepository.create(shapeData);
    }
    async getAllShapes(query: any): Promise<IShape[] | null> {
        return await this.shapeRepository.getAllShapes(query);
    }
    async deleteShape(shapeId: string): Promise<IShape | null> {
        return await this.shapeRepository.delete(shapeId);
    }
    async updateShape(shapeData: any, shapeId: string): Promise<IShape | null> {
        const shape = await this.shapeRepository.findById(shapeId);
        if (!shape) throw new NotFoundError("Shape data is not found");
        if (shapeData?.image) {
            const imageKey = extractS3KeyFromUrl(shape.image || "");
            deleteS3Object(imageKey || "");
        }
        console.log(shapeData, "asdfasdfasd");
        return await this.shapeRepository.update(shapeId, shapeData);
    }
}
