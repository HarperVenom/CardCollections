import db from "../db/drizzle";
import { users } from "../db/schema";

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
