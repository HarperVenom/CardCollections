ALTER TABLE "collections" RENAME COLUMN "authorId" TO "ownerId";--> statement-breakpoint
ALTER TABLE "collections" DROP CONSTRAINT "collections_authorId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collections" ADD CONSTRAINT "collections_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
