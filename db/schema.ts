import { text, pgTable, uuid, boolean } from "drizzle-orm/pg-core";

export const cards = pgTable("cards", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  attributes: text("attributes").notNull(),
  category: text("category").notNull(),
  font1: text("font1").notNull(),
  font2: text("font2").notNull(),
  colorBackground: text("color-background").notNull(),
  colorContent: text("color-content").notNull(),
  colorText: text("color-text").notNull(),
  rarity: text("rarity").notNull(),
});
