import { NotFoundError } from "../../constants/customErrors";
import { IUser } from "../../types/user";
import { CustomerRepository } from "./customerRepository";

export class CustomerService {
    constructor(private customerRepository: CustomerRepository) {}

    async getAllCustomers(query: any): Promise<IUser[]> {
        return await this.customerRepository.getAllCustomers(query);
    }
    async changeStatus(customerId:string): Promise<IUser|null> {
        const result =  await this.customerRepository.updateStatus(customerId);
        if(!result) throw new NotFoundError("Customer not found");
        return result;
    }
    async updateIsBlocked (customerId:string): Promise<IUser|null> {
        const result =  await this.customerRepository.updateIsBlocked(customerId);
        if(!result) throw new NotFoundError("Customer not found");
        return result;
    }
    async deleteUser (customerId:string): Promise<IUser|null> {
        const result =  await this.customerRepository.softDelete(customerId);
        if(!result) throw new NotFoundError("Customer not found");
        return result;
    }
}
