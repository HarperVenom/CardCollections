import { relations } from "drizzle-orm";
import {
  text,
  pgTable,
  uuid,
  timestamp,
  json,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  imgUrl: text("imgUrl"),
  balance: integer("balance").notNull().default(100),
});

export const cards = pgTable("cards", {
  id: uuid("id").primaryKey().defaultRandom(),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  imageLayout: text("imageLayout").notNull(),
  description: text("description").notNull(),
  attributes: text("attributes").notNull(),
  category: text("category").notNull(),
  font1: text("font1").notNull(),
  font2: text("font2").notNull(),
  borderColor: text("borderColor").notNull(),
  borderRadius: text("borderRadius").notNull(),
  textureBackground: text("textureBackground").notNull(),
  textureContent: text("textureContent").notNull(),
  colorBackground: text("color-background").notNull(),
  colorContent: text("color-content").notNull(),
  colorText: text("color-text").notNull(),
  rarity: text("rarity").notNull(),
});

export const cardsRelations = relations(cards, ({ one }) => ({
  author: one(users, {
    fields: [cards.authorId],
    references: [users.id],
  }),
}));

export const publicCards = pgTable("publicCards", {
  id: uuid("id").primaryKey().defaultRandom(),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  collectionId: uuid("collectionId")
    .notNull()
    .references(() => collections.id),
});

export const publicCardsRelations = relations(publicCards, ({ one }) => ({
  author: one(users, {
    fields: [publicCards.authorId],
    references: [users.id],
  }),
  collection: one(collections, {
    fields: [publicCards.collectionId],
    references: [collections.id],
  }),
}));

export const collections = pgTable("collections", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: text("ownerId")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  cards: many(publicCards),
  author: one(users, {
    fields: [collections.ownerId],
    references: [users.id],
  }),
}));
