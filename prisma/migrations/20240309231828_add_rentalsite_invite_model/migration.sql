-- CreateTable
CREATE TABLE "RentalSiteInvite" (
    "email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "rentalSiteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "RentalSiteInvite_rentalSiteId_idx" ON "RentalSiteInvite"("rentalSiteId");

-- CreateIndex
CREATE UNIQUE INDEX "RentalSiteInvite_email_rentalSiteId_key" ON "RentalSiteInvite"("email", "rentalSiteId");

-- AddForeignKey
ALTER TABLE "RentalSiteInvite" ADD CONSTRAINT "RentalSiteInvite_rentalSiteId_fkey" FOREIGN KEY ("rentalSiteId") REFERENCES "RentalSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
