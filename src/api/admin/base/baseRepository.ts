import baseModel from "../../../models/baseModel";
import { BaseRepository } from "../../../repositories/baseRepository";
import { IBaseProduct } from "../../../types/IBase";

export class BaseproductRepository extends BaseRepository <IBaseProduct>{
    constructor(){
        super(baseModel)
    }

    async getAllBaseProducts(query:any):Promise<IBaseProduct[]>{
        return await baseModel.find()
    }

}