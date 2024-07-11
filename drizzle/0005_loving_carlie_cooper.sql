ALTER TABLE "cards" ALTER COLUMN "authorId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "collections" ALTER COLUMN "authorId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;