"use server";

import { revalidatePath } from "next/cache";
import db from "../db/drizzle";
import { publicCards } from "../db/schema";
import { redirect } from "next/navigation";

export async function addCardToCollection(
  collectionId: string,
  cardId: string,
  authorId: string
) {
  try {
    const res = await db.insert(publicCards).values({
      authorId: authorId,
      cardId: cardId,
      collectionId: collectionId,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath(`/collections`);
  revalidatePath(`/collections/${collectionId}`);
  redirect(`/collections`);
}
