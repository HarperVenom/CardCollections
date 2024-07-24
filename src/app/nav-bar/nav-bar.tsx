import { Button } from "@/components/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import NavLinks from "./nav-links";
import Link from "next/link";
import { Spinner } from "@nextui-org/spinner";
import { getUser } from "../../../actions/userAtions";
import Coin from "@/assets/coin";

export default async function NavBar() {
  const clerkUser = await currentUser();
  const user = clerkUser ? await getUser(clerkUser.id) : null;

  return (
    <nav className="bg-white shadow z-[2] h-16 relative">
      <NavLinks user={user}></NavLinks>
    </nav>
  );
}
