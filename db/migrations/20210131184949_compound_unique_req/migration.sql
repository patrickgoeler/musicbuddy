/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[fromId,toId]` on the table `Request`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Request.fromId_toId_unique" ON "Request"("fromId", "toId");
