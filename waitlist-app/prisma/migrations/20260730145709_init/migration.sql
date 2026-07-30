-- CreateTable
CREATE TABLE "signups" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "age_confirmed" BOOLEAN NOT NULL DEFAULT true,
    "state" TEXT,
    "challenge_interests" TEXT NOT NULL DEFAULT '',
    "referral_source" TEXT,
    "terms_agreed_at" DATETIME,
    "unique_referral_code" TEXT NOT NULL,
    "referred_by_code" TEXT,
    "waitlist_position" INTEGER,
    "bonus_eligible" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'eligible',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "signups_email_key" ON "signups"("email");

-- CreateIndex
CREATE UNIQUE INDEX "signups_unique_referral_code_key" ON "signups"("unique_referral_code");

-- CreateIndex
CREATE INDEX "signups_referred_by_code_idx" ON "signups"("referred_by_code");

-- CreateIndex
CREATE INDEX "signups_status_idx" ON "signups"("status");
