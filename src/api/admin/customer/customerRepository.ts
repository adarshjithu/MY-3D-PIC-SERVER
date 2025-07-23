import User from "../../../models/userModel";
import { BaseRepository } from "../../../repositories/baseRepository";
import { IUser } from "../../../types/user";

export class CustomerRepository extends BaseRepository<IUser> {
    constructor() {
        super(User);
    }

    async getAllCustomers(query: any): Promise<any> {
        const { search, status, blocked, sortKey = "createdAt", sortOrder = "desc" } = query;

        const filter: any = {};

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (status) {
            filter.isActive = status === "active";
        }

        if (blocked) {
            filter.isBlocked = blocked === "blocked";
        }

        const sortDirection = sortOrder === "asc" ? 1 : -1;

        const result = await User.find(filter)
            .sort({ [sortKey]: sortDirection })
            .lean();
        const totalPages = await User.countDocuments();

        return { users: result, totalPages: totalPages };
    }

    async updateStatus(customerId: string): Promise<IUser | null> {
        return await User.findByIdAndUpdate(
            customerId,
            [
                {
                    $set: {
                        isActive: { $not: "$isActive" },
                    },
                },
            ],
            { new: true }
        );
    }
    async updateIsBlocked(customerId: string): Promise<IUser | null> {
        return await User.findByIdAndUpdate(
            customerId,
            [
                {
                    $set: {
                        isBlocked: { $not: "$isBlocked" },
                    },
                },
            ],
            { new: true }
        );
    }

    async softDelete(userId: string): Promise<IUser | null> {
        return await User.findByIdAndUpdate(userId, [{ $set: { isDeleted: { $not: "$isDeleted" } } }], { new: true });
    }
}
