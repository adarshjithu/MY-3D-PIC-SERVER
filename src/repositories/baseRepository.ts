export class BaseRepository<T> {
    protected model: any;

    constructor(model: any) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id).exec();
    }

    async findAll(filter: object = {}): Promise<T[]> {
        return await this.model.find(filter).exec();
    }

    async findOne(filter: object): Promise<T | null> {
        return await this.model.findOne(filter).exec();
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).lean();
    }

    async delete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
