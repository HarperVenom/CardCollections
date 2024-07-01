"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import db from "../db/drizzle";
import { cards as cardsTable } from "../db/schema";
import { CardType, ConvertedCardType } from "../types/types";
import { eq } from "drizzle-orm";

// interface FormState {
//   errors: {
//     fields?: CardField[];
//     _form?: string[];
//   };
// }

export async function getCards(): Promise<ConvertedCardType[]> {
  const data = await db
    .select()
    .from(cardsTable)
    .where(eq(cardsTable.isTemplate, false));

  const cards = data.map((card) => convertCard(card));

  return cards;
}

export async function getTemplates(): Promise<ConvertedCardType[]> {
  const data = await db
    .select()
    .from(cardsTable)
    .where(eq(cardsTable.isTemplate, true));

  const templates = data.map((card) => convertCard(card));

  return templates;
}

export async function createCard(formState: any, formData: FormData) {
  const keys = formData.getAll("name") as string[];
  const values = formData.getAll("value") as string[];

  const template = keys.reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as Record<string, any>);
  const templateString = JSON.stringify(template);

  const newFormData = keys.reduce((acc, key, index) => {
    acc[key] = values[index];
    return acc;
  }, {} as Record<string, any>);
  const dataString = JSON.stringify(newFormData);

  try {
    await db.insert(cardsTable).values({
      fields: dataString,
      isTemplate: false,
    });

    const existingTemplate = await db
      .select()
      .from(cardsTable)
      .where(eq(cardsTable.fields, templateString));

    if (existingTemplate.length === 0) {
      await db.insert(cardsTable).values({
        fields: templateString,
        isTemplate: true,
      });
    }
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

  revalidatePath("/");
  redirect("/");
}

export async function getCard(id: string): Promise<ConvertedCardType> {
  const [data] = await db
    .select()
    .from(cardsTable)
    .where(eq(cardsTable.id, id))
    .limit(1);

  return convertCard(data);
}

// export async function updateCard(
//   id: string,
//   formData: FormData
// ): Promise<FormState> {
//   const result = cardSchema.safeParse({
//     name: formData.get("name"),
//     nickname: formData.get("nickname"),
//   });

//   if (!result.success) {
//     return { errors: result.error.flatten().fieldErrors };
//   }

//   try {
//     await db.update(cards).set({
//       name: result.data.name,
//       nickname: result.data.nickname,
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return {
//         errors: {
//           _form: [error.message],
//         },
//       };
//     } else {
//       return {
//         errors: {
//           _form: ["Something went wrong"],
//         },
//       };
//     }
//   }

//   revalidatePath("/");
//   redirect("/");
// }

export async function deleteCard(id: string) {
  const data = await db.delete(cardsTable).where(eq(cardsTable.id, id));
  return data;
}

function convertCard(card: CardType): ConvertedCardType {
  return {
    ...card,
    fields: JSON.parse(card.fields),
  };
}
