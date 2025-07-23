import express from 'express';
import asyncHandler from '../../../utils/asyncHandler';
import { CategoryRepository } from './categoryRepository';
import { CategoryService } from './categoryService';
import { CategoryController } from './categoryController';
import { ProductRepository } from '../product/productRepository';

const categoryRouter = express.Router();
const categoryRepository =  new CategoryRepository();
const productRepository  = new ProductRepository()
const categoryService =  new CategoryService(categoryRepository,productRepository);
const controller = new CategoryController(categoryService);

categoryRouter.post('/',asyncHandler(controller.createCategory.bind(controller)));
categoryRouter.put('/:categoryId',asyncHandler(controller.updateCategory.bind(controller)));
categoryRouter.delete('/:categoryId',asyncHandler(controller.deleteCategory.bind(controller)));
categoryRouter.get('/',asyncHandler(controller.findAllCategories.bind(controller)));

export default categoryRouter;