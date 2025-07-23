import categoryModel from "../../../models/categoryModel";
import { BaseRepository } from "../../../repositories/baseRepository";
import { ICategory } from "../../../types/ICategory";

export class CategoryRepository extends BaseRepository<ICategory>{
    constructor(){
        super(categoryModel)
    }


    async findAllCategories(query:any):Promise<any>{
        console.log(query)
        const {search,sortKey,sortOrder,page,limit,status} = query;
        
        const filter:any = {};
        if(search)filter.name ={$regex:search,$options:"i"}
        if(status=='active') filter.isActive = true 
        if(status=='inactive') filter.isActive = false 

        const categories =  await categoryModel.find(filter).skip((parseInt(page)-1)*10).limit(parseInt(limit)).sort({[sortKey]:sortOrder=='asc'?1:-1})
        const totalPages = await categoryModel.countDocuments()
        return {categories,totalPages}
    }
}