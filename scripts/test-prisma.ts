// pkmnhub/scripts/test-prisma.ts

import "dotenv/config";
import { DBClient } from "../app/api/helpers/prisma-client";
import { UserDelegate } from "../app/api/helpers/user-delegate";

async function main() {
  console.log("🔍 Connecting to database...");
  await DBClient.connect();

  const userDelegate = new UserDelegate();

  console.log("\n=== 🧪 TESTING USER DELEGATE ===");

  // 1️⃣ Delete all existing users
  console.log("\nDeleting all existing users...");
  const deleted = await userDelegate.deleteMany();
  console.log("Deleted:", deleted);

  // 2️⃣ Create a new user
  console.log("\nCreating a test user...");
  const newUser = await userDelegate.createModel({
    name: "Lusamine",
    email: "lusamine@pkmn.com",
  });
  console.log("New User:", newUser);

  // 3️⃣ Fetch all users
  console.log("\nFetching all users...");
  const allUsers = await userDelegate.fetchMany();
  console.log("All Users:", allUsers);

  // 4️⃣ Fetch one user
  console.log("\nFetching one user by ID...");
  const oneUser = await userDelegate.fetchOne(newUser.id);
  console.log("Fetched User:", oneUser);

  // // 5️⃣ Delete one user
  // console.log("\nDeleting one user...");
  // const deletedUser = await userDelegate.deleteOne(newUser.id);
  // console.log("Deleted User:", deletedUser);

  // // 6️⃣ Confirm deletion
  // console.log("\nConfirming all users deleted...");
  // const remaining = await userDelegate.fetchMany();
  // console.log("Remaining Users:", remaining);

  // console.log("\n✅ Tests completed successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Test failed:", err);
  })
  .finally(async () => {
    console.log("\n🔌 Disconnecting from database...");
    await DBClient.disconnect();
  });
