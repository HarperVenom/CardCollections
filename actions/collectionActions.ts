"use server";

import { eq } from "drizzle-orm";
import { collections, publicCards } from "../db/schema";
import { CollectionType } from "../types/collectionTypes";
import db from "../db/drizzle";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CardType,
  ConvertedCardType,
  PublicCardType,
} from "../types/cardTypes";

export async function getCollections(id?: string): Promise<CollectionType[]> {
  const data = !id
    ? await db.select().from(collections)
    : await db.select().from(collections).where(eq(collections.ownerId, id));

  return data;
}

export async function createCollection(formState: any, formData: FormData) {
  const user = await currentUser();

  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";

  try {
    await db.insert(collections).values({
      ownerId: user?.id || "",
      title: title,
      description: description,
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

  revalidatePath("/collections");
  redirect("/collections");
}

export async function getCollection(id: string): Promise<CollectionType> {
  const [data] = await db
    .select()
    .from(collections)
    .where(eq(collections.id, id))
    .limit(1);
  return data;
}

export async function getCollectionСards(
  id: string
): Promise<PublicCardType[]> {
  const data = await db
    .select()
    .from(publicCards)
    .where(eq(publicCards.collectionId, id));

  return data;
}

export async function updateCollection(
  id: string,
  formState: any,
  formData: FormData
) {
  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";

  try {
    await db
      .update(collections)
      .set({
        title: title,
        description: description,
      })
      .where(eq(collections.id, id));
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

  revalidatePath("/collections");
  revalidatePath(`/collections/${id}`);
  redirect("/collections");
}

export async function deleteCollection(id: string) {
  const data = await db.delete(collections).where(eq(collections.id, id));
  revalidatePath("/collections");
  revalidatePath(`/collections/${id}`);
  redirect("/collections");
}
