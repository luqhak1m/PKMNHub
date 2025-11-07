import { PrismaClient, User, Pokemon } from "../app/generated/prisma/client";
import "dotenv/config";

// // step 1: create new prisma client instance

const prisma=new PrismaClient();

async function createModel<T>(
  model: {create: (
    args: {
      data: T
    }
  )=>Promise<T>},
  data: T
){
  const created_model=await model.create({data});
  console.log('Created Model:\n', created_model);
  return created_model;
}

async function fetchAll<T extends {id: string}>(
  model: {
    findMany:()=>Promise<T[]>
  } // expects a list of T objects
): Promise<T[]>{ // return type of list of T objects
  const fetched_models=await model.findMany();
  console.log('Fetched Models:\n', fetched_models);
  return fetched_models;
}

async function fetchOne<T extends {id: string}>(
  model: {findUnique: (
    args: {
      where: {
        id: any
      }
    }
  )=>Promise<T|null>}, // null if nothing is found
  id: string
){
    const fetched_model=await model.findUnique({where: {id}});
    console.log('Fetched Model:\n', fetched_model);
    return fetched_model;
}

async function deleteMany<T extends{id: string}>(
  model: {
    deleteMany:()=>Promise<{count: string}>
  }
){
  const deleted_models_count=await model.deleteMany();
  console.log('Deleted Models Count:\n', deleted_models_count);
  return deleted_models_count;
}

async function deleteOne<T extends{id: string}>(
  model: {
    delete: (
      args: {
        where: {
          id: string
        }
      }
    )=>Promise<T>
  },
  id: string
){
  const deleted_model=await model.delete({where: {id}});
  console.log('Deleted Model:\n', deleted_model);
  return deleted_model;
}

const user_del=prisma.user;
const pokemon_del=prisma.pokemon;
const user_data={
  email: "ash@pallet.town",
  name: "Ash Ketchum",
};
const pokemon_data={
name: "Pikachu",
nat_dex: 25,
loc_dex: 1,
}

try{
  // const user=await fetchOne(user_del, 1);
  // const pokemon=await fetchOne(pokemon_del, 1);
  // await deleteMany(user_del);
  // await deleteMany(pokemon_del);
  // await createModel(user_del, user_data)
  // await createModel(pokemon_del, pokemon_data)
  // await deleteOne(user_del, 'b992b194-6811-4fda-9e67-82f13847aea4')
  // await deleteOne(pokemon_del, 'ae381755-9fb3-4017-9c22-666f47fb6593')
  // const users=await fetchAll(user_del);
  // const pokemons=await fetchAll(pokemon_del);
}catch(e){
  console.error(e);
}finally{
  await prisma.$disconnect();
}
