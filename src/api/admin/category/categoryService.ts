import slugify from "slugify";
import { BadRequestError, NotFoundError } from "../../../constants/customErrors";
import { ICategory } from "../../../types/ICategory";
import { ProductRepository } from "../product/productRepository";
import { CategoryRepository } from "./categoryRepository";

export class CategoryService {
    constructor(private categoryRepository: CategoryRepository, private productRepository: ProductRepository) {}

    async createCategory(categoryData: ICategory): Promise<ICategory | null> {
        const slug = slugify(categoryData.name, { lower: true, strict: true });
        const newCategory = { ...categoryData, slug };
        return await this.categoryRepository.create(newCategory);
    }

    async updateCategory(categoryId: string, categoryData: ICategory): Promise<ICategory | null> {
        const category = await this.categoryRepository.update(categoryId, categoryData);

        if (!category) throw new NotFoundError("Category data not found");
        return category;
    }

    async deleteCategory(categoryId: string): Promise<ICategory | null> {
        const productCount = await this.productRepository.findAllProductCountByCategoryId(categoryId);
        if (productCount > 0)
            throw new BadRequestError(
                `Cannot delete this category because products are still assigned to it. Please remove or reassign those products before deleting the category.`
            );
        const category = await this.categoryRepository.delete(categoryId);
        if (!category) throw new NotFoundError("Category data not found");
        return category;
    }

    async getAllCategories(query: any): Promise<ICategory[] | null> {
        return await this.categoryRepository.findAllCategories(query);
    }
}
