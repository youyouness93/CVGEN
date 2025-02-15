/*
  Warnings:

  - Made the column `jobData` on table `CV` required. This step will fail if there are existing NULL values in that column.

*/
-- Convertir les colonnes en TEXT
ALTER TABLE "CV" ALTER COLUMN "originalCV" TYPE TEXT;
ALTER TABLE "CV" ALTER COLUMN "jobData" TYPE TEXT;
ALTER TABLE "CV" ALTER COLUMN "optimizedCV" TYPE TEXT;

-- Ajouter la colonne contentHash
ALTER TABLE "CV" ADD COLUMN "contentHash" TEXT;

-- Mettre à jour les enregistrements existants
UPDATE "CV" SET "contentHash" = CONCAT('legacy_', id) WHERE "contentHash" IS NULL;

-- Rendre la colonne NOT NULL
ALTER TABLE "CV" ALTER COLUMN "contentHash" SET NOT NULL;

-- Ajouter l'index unique
CREATE UNIQUE INDEX "CV_contentHash_key" ON "CV"("contentHash");
