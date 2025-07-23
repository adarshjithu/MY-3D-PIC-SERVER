import productModel from "../../../models/productModel";
import { BaseRepository } from "../../../repositories/baseRepository";

export class ProductRepository extends BaseRepository<any>{
    constructor(){
        super(productModel)
    }

    async findAllProductCountByCategoryId(categoryId:string):Promise<any>{
        return await productModel.find({category:categoryId}).countDocuments()
    }
}