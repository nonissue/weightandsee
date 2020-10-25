# Migration `20201024092106-init`

This migration has been generated by nonissue at 10/24/2020, 3:21:06 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "role" TEXT NOT NULL,
    "email" TEXT
)

CREATE TABLE "Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "nickName" TEXT
)

CREATE TABLE "weighins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weighDate" DATETIME NOT NULL,
    "weight" INTEGER NOT NULL,
    "personId" INTEGER,

    FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "users.email_unique" ON "users"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201024092106-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,45 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now()) @map(name: "created_at")
+  updatedAt DateTime @default(now()) @map(name: "updated_at")
+  name      String?
+  role      String
+  email     String?  @unique
+  // posts     WeighIn[]
+
+  @@map(name: "users")
+}
+
+model Person {
+  id        Int       @id @default(autoincrement())
+  createdAt DateTime  @default(now()) @map(name: "created_at")
+  updatedAt DateTime  @default(now()) @map(name: "updated_at")
+  name      String
+  nickName  String?
+  weighIns  WeighIn[]
+}
+
+model WeighIn {
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now()) @map(name: "created_at")
+  updatedAt DateTime @default(now()) @map(name: "updated_at")
+  weighDate DateTime
+  weight    Int
+
+  personId Int?
+  Person   Person? @relation(fields: [personId], references: [id])
+
+  @@map(name: "weighins")
+}
```

