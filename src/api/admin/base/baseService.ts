import { BaseRepository } from "../../../repositories/baseRepository";
import { IBaseProduct } from "../../../types/IBase";
import { BaseproductRepository } from "./baseRepository";

export class BaseProductService {
    constructor(private baseRepository:BaseproductRepository){

    }

    async getAllBaseProducts(query:any):Promise<IBaseProduct[]>{
        return await this.baseRepository.getAllBaseProducts(query)
    }
}