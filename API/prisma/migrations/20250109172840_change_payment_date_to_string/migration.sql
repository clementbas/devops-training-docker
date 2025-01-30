-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_reason" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "payment_date" TEXT,
    "status" TEXT NOT NULL,
    CONSTRAINT "Bill_id_reason_fkey" FOREIGN KEY ("id_reason") REFERENCES "Reason" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bill_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bill" ("amount", "id", "id_reason", "id_user", "payment_date", "status") SELECT "amount", "id", "id_reason", "id_user", "payment_date", "status" FROM "Bill";
DROP TABLE "Bill";
ALTER TABLE "new_Bill" RENAME TO "Bill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
