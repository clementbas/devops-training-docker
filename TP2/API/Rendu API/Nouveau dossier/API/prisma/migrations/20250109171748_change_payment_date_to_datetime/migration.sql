/*
  Warnings:

  - You are about to alter the column `payment_date` on the `Bill` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - Made the column `payment_date` on table `Bill` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_reason" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "payment_date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Bill_id_reason_fkey" FOREIGN KEY ("id_reason") REFERENCES "Reason" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bill_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bill" ("amount", "id", "id_reason", "id_user", "payment_date", "status") SELECT "amount", "id", "id_reason", "id_user", "payment_date", "status" FROM "Bill";
DROP TABLE "Bill";
ALTER TABLE "new_Bill" RENAME TO "Bill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
