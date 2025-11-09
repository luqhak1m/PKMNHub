import { BaseDelegate } from "./base-delegate";
import { DBClient } from "./prisma-client";
import { User } from "../../../generated/prisma/client";

const prisma=DBClient.getInstance();

export class UserDelegate extends BaseDelegate<User>{
    constructor(){
        super(prisma.user);
    }
 }