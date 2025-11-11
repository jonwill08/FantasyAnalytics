-- CreateEnum
CREATE TYPE "Position" AS ENUM ('QB', 'RB', 'WR', 'TE', 'K', 'DEF');

-- CreateEnum
CREATE TYPE "PlayerSource" AS ENUM ('USER_ADDED', 'BULK_IMPORT', 'TRENDING', 'SLEEPER_SYNC');

-- CreateTable
CREATE TABLE "Team" (
    "id" UUID NOT NULL,
    "externalKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT,
    "conference" TEXT,
    "division" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" UUID NOT NULL,
    "externalKey" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "position" "Position" NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "rookieYear" INTEGER,
    "heightInches" INTEGER,
    "weightLbs" INTEGER,
    "dob" DATE,
    "source" "PlayerSource" NOT NULL DEFAULT 'USER_ADDED',
    "lastFetchedAt" TIMESTAMP(3),
    "rawData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" UUID,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPlayer" (
    "id" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "playerId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleeperUserInfo" (
    "id" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "sleeperId" TEXT NOT NULL,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SleeperUserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleeperLeagueInfo" (
    "id" UUID NOT NULL,
    "sleeperUserInfoId" UUID NOT NULL,
    "leagueId" TEXT NOT NULL,
    "season" INTEGER NOT NULL DEFAULT 2025,
    "rosterPositions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "scoringSettings" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SleeperLeagueInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleeperLeagueRoster" (
    "id" UUID NOT NULL,
    "sleeperLeagueInfoId" UUID NOT NULL,
    "rosterId" TEXT NOT NULL,
    "players" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "reserve" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "starters" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SleeperLeagueRoster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_externalKey_key" ON "Team"("externalKey");

-- CreateIndex
CREATE UNIQUE INDEX "Team_abbreviation_key" ON "Team"("abbreviation");

-- CreateIndex
CREATE INDEX "Team_externalKey_idx" ON "Team"("externalKey");

-- CreateIndex
CREATE UNIQUE INDEX "Player_externalKey_key" ON "Player"("externalKey");

-- CreateIndex
CREATE INDEX "Player_teamId_idx" ON "Player"("teamId");

-- CreateIndex
CREATE INDEX "Player_position_idx" ON "Player"("position");

-- CreateIndex
CREATE INDEX "Player_lastName_idx" ON "Player"("lastName");

-- CreateIndex
CREATE INDEX "Player_source_idx" ON "Player"("source");

-- CreateIndex
CREATE INDEX "Player_externalKey_idx" ON "Player"("externalKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserPlayer_userId_idx" ON "UserPlayer"("userId");

-- CreateIndex
CREATE INDEX "UserPlayer_playerId_idx" ON "UserPlayer"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPlayer_userId_playerId_key" ON "UserPlayer"("userId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "SleeperUserInfo_userId_key" ON "SleeperUserInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SleeperUserInfo_sleeperId_key" ON "SleeperUserInfo"("sleeperId");

-- CreateIndex
CREATE INDEX "SleeperUserInfo_sleeperId_idx" ON "SleeperUserInfo"("sleeperId");

-- CreateIndex
CREATE UNIQUE INDEX "SleeperLeagueInfo_leagueId_key" ON "SleeperLeagueInfo"("leagueId");

-- CreateIndex
CREATE INDEX "SleeperLeagueInfo_leagueId_idx" ON "SleeperLeagueInfo"("leagueId");

-- CreateIndex
CREATE INDEX "SleeperLeagueInfo_sleeperUserInfoId_idx" ON "SleeperLeagueInfo"("sleeperUserInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "SleeperLeagueRoster_rosterId_key" ON "SleeperLeagueRoster"("rosterId");

-- CreateIndex
CREATE INDEX "SleeperLeagueRoster_rosterId_idx" ON "SleeperLeagueRoster"("rosterId");

-- CreateIndex
CREATE INDEX "SleeperLeagueRoster_sleeperLeagueInfoId_idx" ON "SleeperLeagueRoster"("sleeperLeagueInfoId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlayer" ADD CONSTRAINT "UserPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlayer" ADD CONSTRAINT "UserPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleeperUserInfo" ADD CONSTRAINT "SleeperUserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleeperLeagueInfo" ADD CONSTRAINT "SleeperLeagueInfo_sleeperUserInfoId_fkey" FOREIGN KEY ("sleeperUserInfoId") REFERENCES "SleeperUserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleeperLeagueRoster" ADD CONSTRAINT "SleeperLeagueRoster_sleeperLeagueInfoId_fkey" FOREIGN KEY ("sleeperLeagueInfoId") REFERENCES "SleeperLeagueInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
