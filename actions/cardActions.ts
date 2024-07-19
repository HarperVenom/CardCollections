"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import db from "../db/drizzle";
import { cards as cardsTable } from "../db/schema";
import { CardType, ConvertedCardType } from "../types/cardTypes";
import { eq } from "drizzle-orm";
import { backendClient } from "@/lib/edgestore-server";
import { currentUser } from "@clerk/nextjs/server";

export async function getCards(): Promise<ConvertedCardType[]> {
  const user = await currentUser();

  const data = await db
    .select()
    .from(cardsTable)
    .where(eq(cardsTable.authorId, user?.id || ""));

  const cards = data.map((card) => convertCard(card));
  return cards;
}

export async function createCard(formState: any, formData: FormData) {
  const card = await getCardFromForm(formData);

  const user = await currentUser();

  try {
    await db.insert(cardsTable).values({
      authorId: user?.id || "",
      title: card.title,
      image: card.image,
      description: card.description,
      attributes: card.attributes,
      category: card.category,
      font1: card.font1,
      font2: card.font2,
      colorBackground: card.colorBackground,
      colorContent: card.colorContent,
      colorText: card.colorText,
      rarity: card.rarity,
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

  revalidatePath("/workshop");
  redirect("/workshop");
}

export async function getCard(id: string): Promise<ConvertedCardType> {
  const [data] = await db
    .select()
    .from(cardsTable)
    .where(eq(cardsTable.id, id))
    .limit(1);
  return convertCard(data);
}

export async function updateCard(
  id: string,
  formState: any,
  formData: FormData
) {
  const card = await getCardFromForm(formData);
  try {
    await db
      .update(cardsTable)
      .set({
        title: card.title,
        image: card.image,
        description: card.description,
        attributes: card.attributes,
        category: card.category,
        font1: card.font1,
        font2: card.font2,
        colorBackground: card.colorBackground,
        colorContent: card.colorContent,
        colorText: card.colorText,
        rarity: card.rarity,
      })
      .where(eq(cardsTable.id, id));
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

  revalidatePath("/workshop");
  revalidatePath(`/workshop/${id}`);
  redirect("/workshop");
}

export async function deleteCard(id: string) {
  const data = await db.delete(cardsTable).where(eq(cardsTable.id, id));
  revalidatePath("/workshop");
  revalidatePath(`/cards/${id}`);
  redirect("/workshop");
}

function convertCard(card: CardType): ConvertedCardType {
  return {
    id: card.id,
    title: {
      value: card.title!,
    },
    image: {
      url: card.image!,
    },
    description: {
      value: card.description!,
    },
    attributes: card.attributes && JSON.parse(card.attributes),
    category: {
      value: card.category!,
    },
    settings: {
      font1: card.font1,
      font2: card.font2,
      color: {
        background: card.colorBackground,
        content: card.colorContent,
        text: card.colorText,
      },
    },
    rarity: card.rarity,
  };
}

async function getCardFromForm(formData: FormData) {
  const keys = formData.getAll("attribute-name") as string[];
  const values = formData.getAll("attribute-value") as string[];

  const image = formData.get("image") as File;

  let imgUrl: string;

  if (image.size !== 0) {
    const res = await backendClient.publicFiles.upload({
      content: {
        blob: new Blob([image], { type: image.type }),
        extension: "png",
      },
    });
    imgUrl = res.url;
  } else {
    imgUrl = formData.get("imageURL")?.toString() as string;
  }

  const attributes = keys.reduce((acc, key, index) => {
    acc[key] = values[index];
    return acc;
  }, {} as Record<string, any>);
  const attributesString = JSON.stringify(attributes);

  const card = {
    title: formData.get("title")?.toString() || "",
    image: imgUrl,
    description: formData.get("description")?.toString() || "",
    attributes: attributesString,
    category: formData.get("category")?.toString() || "",
    font1: formData.get("font1")?.toString() || "",
    font2: formData.get("font2")?.toString() || "",
    colorBackground: formData.get("color-background")?.toString() || "",
    colorContent: formData.get("color-content")?.toString() || "",
    colorText: formData.get("color-text")?.toString() || "",
    rarity: formData.get("rarity")?.toString() || "",
  };

  return card;
}
