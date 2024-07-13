import { Button } from "@/components/button";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import NavLinks from "./nav-links";

export default async function NavBar() {
  const user = await currentUser();

  return (
    <nav className="bg-gray-300 shadow-lg z-[2] min-h-16">
      <ul className="flex max-w-[1400px] h-full m-auto items-center z-[10] relative">
        <NavLinks></NavLinks>
        <div className="flex items-center ml-auto mr-4 z-[-3]">
          {user ? (
            <>
              <div className=" flex items-center gap-2 p-2 mx-2 rounded cursor-pointer hover:bg-gray-200">
                <img
                  className="rounded-full"
                  src={user.imageUrl}
                  width="40"
                  height="40"
                  alt=""
                ></img>
                <div>{user?.firstName}</div>
              </div>
              <SignOutButton>
                <Button>Sign Out</Button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          )}
        </div>
      </ul>
    </nav>
  );
}
