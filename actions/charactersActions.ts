"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import db from "../db/drizzle";
import { characters } from "../db/schema";
import { CharacterType } from "../types/characterType";
import { eq } from "drizzle-orm";

const characterSchema = z.object({
  name: z.string().min(1).max(255),
  nickname: z.string().min(1).max(255),
});

interface FormState {
  errors: {
    name?: string[];
    nickname?: string[];
    _form?: string[];
  };
}

export async function getCharacters(): Promise<CharacterType[]> {
  const data = await db.select().from(characters);
  return data;
}

export async function createCharacter(
  formState: any,
  formData: FormData
): Promise<FormState> {
  const result = characterSchema.safeParse({
    name: formData.get("name"),
    nickname: formData.get("nickname"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    await db.insert(characters).values({
      name: result.data.name,
      nickname: result.data.nickname,
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

  revalidatePath("/");
  redirect("/");
}

export async function getCharacter(id: string): Promise<CharacterType> {
  const [data] = await db
    .select()
    .from(characters)
    .where(eq(characters.id, id))
    .limit(1);
  return data;
}

export async function updateCharacter(
  id: string,
  formData: FormData
): Promise<FormState> {
  const result = characterSchema.safeParse({
    name: formData.get("name"),
    nickname: formData.get("nickname"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    await db.update(characters).set({
      name: result.data.name,
      nickname: result.data.nickname,
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

  revalidatePath("/");
  redirect("/");
}

export async function deleteCharacter(id: string) {
  const data = await db.delete(characters).where(eq(characters.id, id));
  return data;
}
