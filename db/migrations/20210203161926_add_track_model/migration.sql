/*
  Warnings:

  - You are about to drop the column `tracks` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `tracks` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "tracks";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tracks";

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "userId" TEXT,
    "album" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "acousticness" DECIMAL(65,30) NOT NULL,
    "danceability" DECIMAL(65,30) NOT NULL,
    "energy" DECIMAL(65,30) NOT NULL,
    "instrumentalness" DECIMAL(65,30) NOT NULL,
    "liveness" DECIMAL(65,30) NOT NULL,
    "speechiness" DECIMAL(65,30) NOT NULL,
    "valence" DECIMAL(65,30) NOT NULL,
    "requestId" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Track" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
