-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "withChip" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "playedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "chipCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Score_userId_idx" ON "Score"("userId");

-- CreateIndex
CREATE INDEX "Score_gameId_idx" ON "Score"("gameId");
