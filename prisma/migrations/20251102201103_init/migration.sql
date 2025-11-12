-- CreateTable
CREATE TABLE "String_value" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Properties" (
    "length" INTEGER NOT NULL,
    "is_palindrome" BOOLEAN NOT NULL,
    "unique_characters" INTEGER NOT NULL,
    "word_count" INTEGER NOT NULL,
    "sha256_hash" TEXT NOT NULL,
    "character_frequency_map" JSONB NOT NULL,
    "properties_id" TEXT NOT NULL,
    CONSTRAINT "Properties_properties_id_fkey" FOREIGN KEY ("properties_id") REFERENCES "String_value" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "String_value_value_key" ON "String_value"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Properties_sha256_hash_key" ON "Properties"("sha256_hash");

-- CreateIndex
CREATE UNIQUE INDEX "Properties_properties_id_key" ON "Properties"("properties_id");
