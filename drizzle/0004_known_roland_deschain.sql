ALTER TABLE "cards" ALTER COLUMN "authorId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "collections" ALTER COLUMN "authorId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "publicCards" ALTER COLUMN "authorId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "publicCards" ALTER COLUMN "collectionId" SET DATA TYPE uuid;