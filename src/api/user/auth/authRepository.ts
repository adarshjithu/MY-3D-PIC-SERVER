import User from "../../../models/userModel";
import { BaseRepository } from "../../../repositories/baseRepository";
import { IUser } from "../../../types/user";

export class AuthRepository extends BaseRepository<IUser>{
    constructor(){
        super(User)
    }

    async findByEmail(email:string):Promise<IUser|null>{
          return await User.findOne({email:email})
    }
}