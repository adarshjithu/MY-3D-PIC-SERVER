import { NotFoundError } from "../../../constants/customErrors";
import { IAddress } from "../../../types/address";
import { AddressRepository } from "./addressRepository";

export class AddressService {
    constructor(private addressRepository: AddressRepository) {}

    async createAddress(addressData: IAddress,userId:string): Promise<IAddress> {
        if(addressData?.isDefault){
            await this.addressRepository.updateIsDefault(userId)
        }
        return await this.addressRepository.create(addressData);
    }

    async updateAddress(addressId:string,newAddress:IAddress):Promise<IAddress|null>{
        const result =  await this.addressRepository.update(addressId,newAddress)
        if(!result) throw new NotFoundError("Address not found");
        return result;
    }

    async deleteAddress(addressId:string):Promise<IAddress|null>{
        const result =  await this.addressRepository.delete(addressId);
        if(!result) throw new NotFoundError("Address not found");
        return result;
    }
    async getAllAddress(userId:string):Promise<IAddress[]|[]>{
        const result =  await this.addressRepository.getAllAddress(userId);
        return result;
    }
}
