import { currentUser } from "@clerk/nextjs/server";
import NavLinks from "./nav-links";
import { getUser } from "../../../actions/userAtions";

export default async function NavBar() {
  const clerkUser = await currentUser();
  const user = clerkUser ? await getUser(clerkUser.id) : null;

  return (
    <nav className="sticky top-0 bg-white shadow z-[2] h-16">
      <NavLinks user={user}></NavLinks>
    </nav>
  );
}
