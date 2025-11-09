import "dotenv/config";

abstract class BaseDelegate<T extends {id: string}>{
    private model: { // the model must possesses these functions
        findMany:()=>Promise<T[]>,
        deleteMany: ()=>Promise<{count: number}>,
        create: (args: { data: Omit<T, "id" | "createdAt"> })=>Promise<T>, // omit the id from T type because ID is auto generated. can only pass the data without id like data={ name="name", email="email" } instead of data={ id="id", name="name", email="email" }
        findUnique: (args: {where: {id: string}})=>Promise<T|null>,
        delete: (args: {where: {id: string}})=>Promise<T>
    };

    public constructor(model:  { // the model must possesses these functions
        findMany:()=>Promise<T[]>,
        deleteMany: ()=>Promise<{count: number}>,
        create: (args: { data: Omit<T, "id" | "createdAt"> })=>Promise<T>, // omit the id from T type because ID is auto generated. can only pass the data without id like data={ name="name", email="email" } instead of data={ id="id", name="name", email="email" }
        findUnique: (args: {where: {id: string}})=>Promise<T|null>,
        delete: (args: {where: {id: string}})=>Promise<T>
    }){
        this.model=model;
    }

    async fetchMany(): Promise<T[]>{ // return type of list of T objects
        const fetched_models=await this.model.findMany();
        console.log('Fetched Models:\n', fetched_models);
        return fetched_models;
    }

    async deleteMany(): Promise<{count: number}>{
        const deleted_models_count=await this.model.deleteMany();
        console.log('Deleted Models Count:\n', deleted_models_count);
        return deleted_models_count;
    }

    async createModel(data: Omit<T, "id"| "createdAt">){ // again, expects data without id
        const created_model=await this.model.create({data});
        console.log('Created Model:\n', created_model);
        return created_model;
    }

    async fetchOne(id: string){
        const fetched_model=await this.model.findUnique({where: {id}});
        console.log('Fetched Model:\n', fetched_model);
        return fetched_model;
    }

    async deleteOne(id: string){
        const deleted_model=await this.model.delete({where: {id}});
        console.log('Deleted Model:\n', deleted_model);
        return deleted_model;
    }
}

export { BaseDelegate };
