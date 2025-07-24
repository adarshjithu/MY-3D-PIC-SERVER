import slugify from "slugify";
import { BaseRepository } from "../../../repositories/baseRepository";
import { IBaseProduct } from "../../../types/IBase";
import { BaseproductRepository } from "./baseRepository";
import { generateSkuFromProductName } from "../../../utils/generateSkuFromProductName";
import { ConflictError, NotFoundError } from "../../../constants/customErrors";

export class BaseProductService {
    constructor(private baseRepository: BaseproductRepository) {}

    async getAllBaseProducts(query: any): Promise<IBaseProduct[]> {
        return await this.baseRepository.getAllBaseProducts(query);
    }
    async deleteBaseProduct(baseProductId:string): Promise<IBaseProduct|null> {
       const base = await this.baseRepository.findById(baseProductId);
       if(!base) throw new NotFoundError("The product not found ");
       return await this.baseRepository.toggleSoftDelete(baseProductId);
    }

    // Create new base product
    async createBaseProduct(thumbnail: string, images: string[], baseData: any): Promise<IBaseProduct | null> {
        // Generating sku automatically
        const sku = await generateSkuFromProductName(baseData?.name);

        // Generating slug automatically
        const slug = slugify(baseData.name, { lower: true, strict: true });

        // Meta keywords
        const keywordsArray = baseData?.metaKeywords.split(",").map((k: any) => k.trim());

        // Contructing new basedata
        const newBaseData = {
            name: baseData?.name,
            description: baseData?.description,
            price: { basePrice: parseInt(baseData?.basePrice), actualPrice: parseInt(baseData?.actualPrice) },
            inventory: {
                sku: baseData?.sku ? baseData?.sku : sku,
                lowStockThreshold: parseInt(baseData?.lowStockThreshold),
                allowBackorder: baseData?.allowBackorder,
                stock: parseInt(baseData?.quantity),
                isTrackable: baseData?.isTrackable,
            },
            slug: slug,
            seo: {
                metaTitle: baseData?.metaTitle,
                metaDescription: baseData?.metaDescription,
                metaKeywords: baseData?.metaKeywords ? keywordsArray : [],
            },
            isActive: baseData?.isActive == "true" ? true : false,
            images: images,
            thumbnail: thumbnail,
            isDeleted: false,
            size: JSON.parse(baseData?.size),
        };

        return await this.baseRepository.create(newBaseData);
    }
}
