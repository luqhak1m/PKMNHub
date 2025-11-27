-- DropForeignKey
ALTER TABLE "public"."Pokedex" DROP CONSTRAINT "Pokedex_region_id_fkey";

-- AlterTable
ALTER TABLE "Pokedex" ALTER COLUMN "region_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pokedex" ADD CONSTRAINT "Pokedex_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
