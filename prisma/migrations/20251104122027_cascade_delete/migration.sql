-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Properties" (
    "length" INTEGER NOT NULL,
    "is_palindrome" BOOLEAN NOT NULL,
    "unique_characters" INTEGER NOT NULL,
    "word_count" INTEGER NOT NULL,
    "sha256_hash" TEXT NOT NULL,
    "character_frequency_map" JSONB NOT NULL,
    "properties_id" TEXT NOT NULL,
    CONSTRAINT "Properties_properties_id_fkey" FOREIGN KEY ("properties_id") REFERENCES "String_value" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Properties" ("character_frequency_map", "is_palindrome", "length", "properties_id", "sha256_hash", "unique_characters", "word_count") SELECT "character_frequency_map", "is_palindrome", "length", "properties_id", "sha256_hash", "unique_characters", "word_count" FROM "Properties";
DROP TABLE "Properties";
ALTER TABLE "new_Properties" RENAME TO "Properties";
CREATE UNIQUE INDEX "Properties_sha256_hash_key" ON "Properties"("sha256_hash");
CREATE UNIQUE INDEX "Properties_properties_id_key" ON "Properties"("properties_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
