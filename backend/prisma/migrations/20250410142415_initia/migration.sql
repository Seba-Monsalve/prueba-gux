/*
  Warnings:

  - The primary key for the `Tarea` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Tarea" DROP CONSTRAINT "Tarea_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tarea_id_seq";
