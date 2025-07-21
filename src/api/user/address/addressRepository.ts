import Address from "../../../models/addressModel";
import { BaseRepository } from "../../../repositories/baseRepository";
import { IAddress } from "../../../types/address";

export class AddressRepository extends BaseRepository<IAddress> {
    constructor() {
        super(Address);
    }

    async updateIsDefault(userId:string):Promise<any>{
        return await Address.updateMany({userId:userId},{$set:{isDefault:false}})
    }
    async getAllAddress(userId:string):Promise<IAddress[]>{
        return await Address.find({userId:userId});
    }
}
