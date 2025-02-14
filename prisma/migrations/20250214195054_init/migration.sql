-- CreateTable
CREATE TABLE "CV" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "originalCV" JSONB NOT NULL,
    "jobData" JSONB,
    "optimizedCV" JSONB,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "error" TEXT,
    "userId" TEXT,

    CONSTRAINT "CV_pkey" PRIMARY KEY ("id")
);
