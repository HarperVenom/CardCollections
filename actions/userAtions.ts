import { eq } from "drizzle-orm";
import db from "../db/drizzle";
import { users } from "../db/schema";
import { User } from "../types/userTypes";

export async function getUser(id: string): Promise<User | null> {
  const [data] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return data as User;
}

export async function createUser(userData: {
  id: string;
  username: string;
  imgUrl?: string;
}) {
  try {
    const res = await db.insert(users).values({
      id: userData.id,
      username: userData.username,
      imgUrl: userData.imgUrl,
      balance: 100,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Something went wrong",
      };
    }
  }
}

export async function updateBalance(id: string, value: number) {
  const user = await getUser(id);
  if (!user) return;
  try {
    await db
      .update(users)
      .set({
        balance: user.balance + value,
      })
      .where(eq(users.id, id));
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
}
