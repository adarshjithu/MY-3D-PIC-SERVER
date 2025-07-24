import baseModel from "../../../models/baseModel";
import { BaseRepository } from "../../../repositories/baseRepository";
import { IBaseProduct } from "../../../types/IBase";

export class BaseproductRepository extends BaseRepository<IBaseProduct> {
    constructor() {
        super(baseModel);
    }

    async getAllBaseProducts(query: any): Promise<any> {

        const filter:any = {}
        filter.isDeleted=false
        const baseProducts = await baseModel.find(filter);
        const totalPages = await baseModel.countDocuments();
        return { baseProducts, totalPages };
    }

    async findByName(name: string): Promise<IBaseProduct | null> {
        return await baseModel.findOne({ name: name });
    }
    async toggleSoftDelete(productId: string): Promise<IBaseProduct | null> {
        return await baseModel.findByIdAndUpdate(productId, [{ $set: { isDeleted: { $not: "$isDeleted" } } }], { new: true });
    }
}
