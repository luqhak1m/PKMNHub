-- DropForeignKey
ALTER TABLE "public"."Ability" DROP CONSTRAINT "Ability_generation_id_fkey";

-- AlterTable
ALTER TABLE "Ability" ALTER COLUMN "generation_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ability" ADD CONSTRAINT "Ability_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "Generation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
