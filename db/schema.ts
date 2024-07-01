import { text, pgTable, uuid, boolean } from "drizzle-orm/pg-core";

export const cards = pgTable("cards", {
  id: uuid("id").primaryKey().defaultRandom(),
  isTemplate: boolean("isTemplate").notNull(),
  fields: text("fields").notNull(),
});
