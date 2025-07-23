import shapeModal from "../../../models/shapeModal";
import { BaseRepository } from "../../../repositories/baseRepository";
import { IShape } from "../../../types/IShape";

export class ShapeRepository extends BaseRepository<IShape> {
    constructor() {
        super(shapeModal);
    }

    async getAllShapes(query: any): Promise<any> {
        const { search, status, sortKey, limit, page, sortOrder } = query;

        const filter: any = {};
        if (search) filter.name = { $regex: search, $options: "i" };
        if (status == "active") filter.isActive = true;
        if (status == "inactive") filter.isActive = false;

        const shapes = await shapeModal
            .find(filter)
            .sort({ [sortKey]: sortOrder == "asc" ? 1 : -1 })
            .skip((parseInt(page) - 1) * 10)
            .limit(limit);
        const totalPages = await shapeModal.countDocuments();
        return { shapes, totalPages };
    }
}
