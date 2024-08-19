"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "../db/drizzle";
import { cards as cardsTable, publicCards } from "../db/schema";
import { CardType, ConvertedCardType } from "../types/cardTypes";
import { eq } from "drizzle-orm";
import { backendClient } from "@/lib/edgestore-server";
import { currentUser } from "@clerk/nextjs/server";
import { convertCard } from "@/utils/utils";

export async function getCards(): Promise<ConvertedCardType[]> {
  const user = await currentUser();

  const data = await db
    .select()
    .from(cardsTable)
    .where(eq(cardsTable.authorId, user?.id || ""));

  const cards = data.map((card) => convertCard(card as CardType));
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
      imageLayout: card.imageLayout,
      description: card.description,
      attributes: card.attributes,
      category: card.category,
      font1: card.font1,
      font2: card.font2,
      borderColor: card.borderColor,
      borderRadius: card.borderRadius,
      textureBackground: card.textureBackground,
      textureContent: card.textureContent,
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
  return convertCard(data as CardType);
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
        imageLayout: card.imageLayout,
        description: card.description,
        attributes: card.attributes,
        category: card.category,
        font1: card.font1,
        font2: card.font2,
        borderColor: card.borderColor,
        borderRadius: card.borderRadius,
        textureBackground: card.textureBackground,
        textureContent: card.textureContent,
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
  await db.delete(publicCards).where(eq(publicCards.cardId, id));
  await db.delete(cardsTable).where(eq(cardsTable.id, id));
  revalidatePath("/workshop");
  revalidatePath(`/cards/${id}`);
  redirect("/workshop");
}

async function getCardFromForm(formData: FormData) {
  const id = formData.get("id") as string;

  const keys = formData.getAll("attribute-name") as string[];
  const values = formData.getAll("attribute-value") as string[];

  const image = formData.get("image") as File;
  const textureBackground = formData.get("texture-background") as File;
  const textureContent = formData.get("texture-content") as File;

  let imgUrl = await getUploadedImgUrl(
    image,
    formData.get("image-url") as string,
    "image"
  );
  let textureBackgroundURL = await getUploadedImgUrl(
    textureBackground,
    formData.get("texture-background-url") as string,
    "background"
  );
  let textureContentURL = await getUploadedImgUrl(
    textureContent,
    formData.get("texture-content-url") as string,
    "content"
  );

  const attributes = keys.reduce((acc, key, index) => {
    acc[key] = values[index];
    return acc;
  }, {} as Record<string, any>);
  const attributesString = JSON.stringify(attributes);

  const card = {
    title: formData.get("title")?.toString() || "",
    image: imgUrl,
    imageLayout: formData.get("image-layout")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    attributes: attributesString,
    category: formData.get("category")?.toString() || "",
    font1: formData.get("font1")?.toString() || "",
    font2: formData.get("font2")?.toString() || "",
    borderColor: formData.get("border-color")?.toString() || "",
    borderRadius:
      (formData.get("border-raduis")?.toString() as "round" | "square") ||
      "round",
    textureBackground: textureBackgroundURL,
    textureContent: textureContentURL,
    colorBackground: formData.get("color-background")?.toString() || "",
    colorContent: formData.get("color-content")?.toString() || "",
    colorText: formData.get("color-text")?.toString() || "",
    rarity: formData.get("rarity")?.toString() || "",
    rarityColor: formData.get("rarity-color")?.toString() || "",
  };

  return card;

  async function getUploadedImgUrl(
    img: File,
    initialURL: string,
    type: "image" | "background" | "content"
  ): Promise<string> {
    let imgUrl: string;

    if (img.size !== 0) {
      const res = await backendClient.publicFiles.upload({
        content: {
          blob: new Blob([img], { type: img.type }),
          extension: "png",
        },
      });
      imgUrl = res.url;
    } else {
      imgUrl = initialURL;
    }

    if (imgUrl !== initialURL) {
      if (id) {
        const card = await getCard(id);
        const previousURL = (() => {
          switch (type) {
            case "image":
              return card.image?.url;
            case "background":
              return card.settings?.texture?.background;
            case "content":
              return card.settings?.texture?.content;
          }
        })();
        if (previousURL) {
          const res = await backendClient.publicFiles.deleteFile({
            url: previousURL,
          });
        }
      }
    }
    return imgUrl;
  }
}
