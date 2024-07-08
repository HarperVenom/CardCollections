CREATE TABLE IF NOT EXISTS "cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"image" text NOT NULL,
	"description" text NOT NULL,
	"attributes" text NOT NULL,
	"category" text NOT NULL,
	"font1" text NOT NULL,
	"font2" text NOT NULL,
	"color-background" text NOT NULL,
	"color-content" text NOT NULL,
	"color-text" text NOT NULL,
	"rarity" text NOT NULL
);
