-- DropForeignKey
ALTER TABLE "public"."Move" DROP CONSTRAINT "Move_move_effect_id_fkey";

-- AlterTable
ALTER TABLE "Move" ALTER COLUMN "move_effect_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_move_effect_id_fkey" FOREIGN KEY ("move_effect_id") REFERENCES "MoveEffect"("id") ON DELETE SET NULL ON UPDATE CASCADE;
