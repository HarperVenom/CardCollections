import { text, pgTable, uuid } from "drizzle-orm/pg-core";

export const characters = pgTable("characters", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  nickname: text("nickname").notNull(),
});
