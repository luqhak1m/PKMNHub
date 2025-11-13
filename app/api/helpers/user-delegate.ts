import { BaseDelegate } from "./base-delegate";
import { DBClient } from "./prisma-client";
import { User } from "../../../generated/prisma/client";

const prisma=DBClient.getInstance();
const table_specific_delegate=prisma.user;

export class UserDelegate extends BaseDelegate<User>{
    
    constructor(){
        super(table_specific_delegate); // this is useless for anything table-specific that doesnt require id. such cases would require direct use of the variable
    }

    async fetchByEmail(email: string): Promise<User | null>{
        const fetched_model=await table_specific_delegate.findUnique({where: {email}});
        console.log('Fetched Model:\n', fetched_model);
        return fetched_model;
    }
 }