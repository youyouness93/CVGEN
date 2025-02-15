/*
  Warnings:

  - Made the column `jobData` on table `CV` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CV" ALTER COLUMN "jobData" SET NOT NULL;
