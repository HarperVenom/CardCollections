ALTER TABLE "cards" ADD COLUMN "fields" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cards" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "cards" DROP COLUMN IF EXISTS "nickname";