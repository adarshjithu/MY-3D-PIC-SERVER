import express from 'express';
import { CustomerRepository } from './customerRepository';
import { CustomerService } from './customerService';
import { CustomerController } from './customerController';
import asyncHandler from '../../utils/asyncHandler';

const customerRoutes =  express.Router();

const customerRepository =  new CustomerRepository();
const customerService  = new CustomerService(customerRepository);
const controller= new CustomerController(customerService);

customerRoutes.get("/",asyncHandler(controller.getAllCustomers.bind(controller)));
customerRoutes.patch("/status/:customerId",asyncHandler(controller.changeStatus.bind(controller)));
customerRoutes.patch("/block/:customerId",asyncHandler(controller.blockUser.bind(controller)));
customerRoutes.delete("/:customerId",asyncHandler(controller.deleteUser.bind(controller)));

export default customerRoutes;