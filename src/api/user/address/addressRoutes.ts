import express from 'express';
import { AddressRepository } from './addressRepository';
import { AddressService } from './addressService';
import { AddresController } from './addressController';
import { authenticate } from '../../../middlewares/authenticate';
import asyncHandler from '../../../utils/asyncHandler';

const addressRoutes =  express.Router();

const addressRepository = new AddressRepository();
const addressService =  new AddressService(addressRepository);
const controller = new AddresController(addressService);

addressRoutes.post('/',authenticate,asyncHandler(controller.createAddress.bind(controller)));
addressRoutes.put('/:addressId',authenticate,asyncHandler(controller.updateAddress.bind(controller)));
addressRoutes.delete('/:addressId',authenticate,asyncHandler(controller.deleteAddress.bind(controller)));
addressRoutes.get('/',authenticate,asyncHandler(controller.getAllAddress.bind(controller)))
export default addressRoutes;