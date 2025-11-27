-- DropForeignKey
ALTER TABLE "public"."Location" DROP CONSTRAINT "Location_region_id_fkey";

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "region_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
