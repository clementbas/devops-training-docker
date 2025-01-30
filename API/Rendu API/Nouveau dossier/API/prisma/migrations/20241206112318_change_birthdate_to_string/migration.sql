-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "deathdate" TEXT
);
INSERT INTO "new_Author" ("birthdate", "deathdate", "fullname", "id") SELECT "birthdate", "deathdate", "fullname", "id" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
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
CREATE TABLE "new_Books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_borrow" INTEGER,
    "id_category" INTEGER NOT NULL,
    "id_author" INTEGER NOT NULL,
    "id_publisher" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "publication" TEXT NOT NULL,
    "description" TEXT,
    "note" REAL,
    "comments" TEXT,
    CONSTRAINT "Books_id_borrow_fkey" FOREIGN KEY ("id_borrow") REFERENCES "Borrow" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Books_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Books_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Books_id_publisher_fkey" FOREIGN KEY ("id_publisher") REFERENCES "Publisher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Books" ("comments", "description", "id", "id_author", "id_borrow", "id_category", "id_publisher", "note", "publication", "title") SELECT "comments", "description", "id", "id_author", "id_borrow", "id_category", "id_publisher", "note", "publication", "title" FROM "Books";
DROP TABLE "Books";
ALTER TABLE "new_Books" RENAME TO "Books";
CREATE TABLE "new_Borrow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "borrow_date" TEXT NOT NULL,
    "return_date" TEXT,
    "due_date" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Borrow_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Borrow" ("borrow_date", "due_date", "id", "id_user", "return_date", "status") SELECT "borrow_date", "due_date", "id", "id_user", "return_date", "status" FROM "Borrow";
DROP TABLE "Borrow";
ALTER TABLE "new_Borrow" RENAME TO "Borrow";
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "reservation_date" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Reservation_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("id", "id_user", "reservation_date", "status") SELECT "id", "id_user", "reservation_date", "status" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "adress" TEXT,
    "birthdate" TEXT
);
INSERT INTO "new_User" ("adress", "birthdate", "email", "firstname", "id", "name", "password") SELECT "adress", "birthdate", "email", "firstname", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
