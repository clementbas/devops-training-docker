/*
  Warnings:

  - You are about to drop the `BORROW` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USER` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BORROW";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "USER";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Reason" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_reason" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "payment_date" DATETIME,
    "status" TEXT NOT NULL,
    CONSTRAINT "Bill_id_reason_fkey" FOREIGN KEY ("id_reason") REFERENCES "Reason" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bill_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "birthdate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Borrow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "borrow_date" DATETIME NOT NULL,
    "return_date" DATETIME,
    "due_date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Borrow_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "reservation_date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Reservation_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reservation_Books" (
    "id_reservation" INTEGER NOT NULL,
    "id_books" INTEGER NOT NULL,

    PRIMARY KEY ("id_reservation", "id_books"),
    CONSTRAINT "Reservation_Books_id_reservation_fkey" FOREIGN KEY ("id_reservation") REFERENCES "Reservation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_Books_id_books_fkey" FOREIGN KEY ("id_books") REFERENCES "Books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "birthdate" DATETIME NOT NULL,
    "deathdate" DATETIME
);

-- CreateTable
CREATE TABLE "Books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_borrow" INTEGER,
    "id_category" INTEGER NOT NULL,
    "id_author" INTEGER NOT NULL,
    "id_publisher" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "publication" DATETIME NOT NULL,
    "description" TEXT,
    "note" REAL,
    "comments" TEXT,
    CONSTRAINT "Books_id_borrow_fkey" FOREIGN KEY ("id_borrow") REFERENCES "Borrow" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Books_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Books_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Books_id_publisher_fkey" FOREIGN KEY ("id_publisher") REFERENCES "Publisher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "website" TEXT
);
