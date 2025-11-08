
import { PrismaClient } from "../../generated/prisma/client";

class DBClient{ // singleton class to ensure only 1 instance of prisma client exists everytime
    private static instance: PrismaClient | undefined; // the instance is static because it belongs to the class itself, not the instance
    private constructor(){}; // to prevent any unwanted instantiation outside of this class
    
    public static getInstance(): PrismaClient{ // instance getter
        if(!DBClient.instance){ // if instance already exists
            DBClient.instance=new PrismaClient(); // return existing instance
        }
        return DBClient.instance; // else return a new instance
    }
    public static async disconnect(): Promise<void>{
        if(DBClient.instance){ // if instance already exists
            await DBClient.instance.$disconnect();
            DBClient.instance=undefined;
        }
    }
    public static async connect(): Promise<void>{
        await this.getInstance().$connect(); // manually connect to the db
    }
}

export { DBClient };
