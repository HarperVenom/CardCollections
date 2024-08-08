ALTER TABLE "publicCards" ADD COLUMN "cardId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "publicCards" ADD CONSTRAINT "publicCards_cardId_cards_id_fk" FOREIGN KEY ("cardId") REFERENCES "public"."cards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
