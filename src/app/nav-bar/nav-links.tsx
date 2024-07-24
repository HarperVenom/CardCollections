"use client";

import MenuIcon from "@/assets/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import "./menu-button.css";
import { User } from "../../../types/userTypes";
import { ClerkLoaded, ClerkLoading, SignOutButton } from "@clerk/nextjs";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@/components/button";
import Coin from "@/assets/coin";

export default function NavLinks({ user }: { user: User | null }) {
  const pathName = usePathname();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpened, setMenuOpened] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (!menuOpened) return;
    menuRef.current.focus();
  }, [menuOpened]);

  useEffect(() => {
    setMenuOpened(false);
  }, [pathName]);

  return (
    <>
      {windowWidth < 768 ? (
        <div className="flex h-full items-center">
          <button
            className="z-10 menu-button transition-all p-2 mx-1 hover:bg-blue-300 hover:text-white active:bg-blue-400 rounded "
            onClick={() => setMenuOpened((prev) => !prev)}
          >
            <MenuIcon stroke="rgb(107 114 128)"></MenuIcon>
          </button>
          <div
            className="z-[8] fixed w-screen h-screen top-0 bg-black opacity-30 transition-all cursor-pointer "
            style={{
              opacity: menuOpened ? "0.3" : "0",
              pointerEvents: menuOpened ? "all" : "none",
            }}
            onClick={() => setMenuOpened(false)}
          ></div>
          {user && (
            <div className="w-fit ml-auto h-full p-1">
              <ProfilePreview
                user={user}
                onClick={setMenuOpened}
              ></ProfilePreview>
            </div>
          )}
          <ul
            className="z-[9] pt-16 fixed min-w-64 h-screen flex flex-col bg-white transition-all top-0 "
            style={{
              transform: menuOpened ? "translate(0, 0)" : "translate(-100%, 0)",
            }}
          >
            <li className="flex">
              <Link
                className="transition-all flex items-center w-full h-full py-4 px-8 text-xl text-gray-500 hover:bg-blue-300 hover:text-white active:bg-blue-400"
                style={{
                  backgroundColor: pathName === "/" ? "rgb(96 165 250)" : "",
                  color: pathName === "/" ? "white" : "",
                }}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="flex">
              <Link
                className="transition-all flex items-center w-full py-4 px-8 text-xl text-gray-500 hover:bg-blue-300 hover:text-white active:bg-blue-400"
                style={{
                  backgroundColor: pathName.includes("/workshop")
                    ? "rgb(96 165 250)"
                    : "",
                  color: pathName.includes("/workshop") ? "white" : "",
                }}
                href="/workshop"
              >
                Workshop
              </Link>
            </li>
            <li className="flex">
              <Link
                className="transition-all flex items-center w-full py-4 px-8 text-xl text-gray-500 hover:bg-blue-300 hover:text-white active:bg-blue-400"
                style={{
                  backgroundColor:
                    pathName === "/collections" ? "rgb(96 165 250)" : "",
                  color: pathName === "/collections" ? "white" : "",
                }}
                href="/collections"
              >
                Collections
              </Link>
            </li>
            {user ? (
              <>
                <li
                  className="mt-auto flex transition-all items-center w-full 
                      py-4 px-8 text-lg text-gray-500 hover:bg-blue-300 
                      hover:text-white active:bg-blue-400 cursor-pointer
                      gap-2 "
                >
                  {user.username}
                  {user.imgUrl ? (
                    <img
                      className="rounded-full"
                      src={user.imgUrl}
                      width="40"
                      height="40"
                      alt=""
                    ></img>
                  ) : null}
                </li>
                <li
                  className="flex transition-all items-center w-full 
                      py-4 px-8 text-lg text-gray-500 hover:bg-blue-300 
                      hover:text-white active:bg-blue-400 cursor-pointer
                      gap-2 "
                >
                  Balance
                  <Coin width={20}></Coin>
                  <div className="text-lg font-bold">{user.balance}</div>
                </li>
                <li>
                  <ClerkLoading>
                    <Spinner></Spinner>
                  </ClerkLoading>
                  <ClerkLoaded>
                    <SignOutButton>
                      <div
                        className="transition-all flex items-center w-full 
                      py-4 px-8 text-lg text-gray-500 hover:bg-gray-300 
                      hover:text-white active:bg-gray-400 cursor-pointer
                      "
                      >
                        Sign Out
                      </div>
                    </SignOutButton>
                  </ClerkLoaded>
                </li>
              </>
            ) : (
              <li className="mt-auto">
                <ClerkLoading>
                  <Spinner></Spinner>
                </ClerkLoading>
                <ClerkLoaded>
                  <Link href={"/sign-in"}>
                    <div
                      className="transition-all flex items-center w-full 
                      py-4 px-8 text-lg text-gray-500 hover:bg-blue-300 
                      hover:text-white active:bg-blue-400 cursor-pointer"
                    >
                      Sign In
                    </div>
                  </Link>
                </ClerkLoaded>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <div className="flex h-full">
          <Links
            user={user}
            menuOpened={menuOpened}
            onClick={setMenuOpened}
            menuRef={menuRef}
          ></Links>
        </div>
      )}
    </>
  );
}

function Links({
  user,
  menuOpened,
  onClick,
  menuRef,
}: {
  user: User | null;
  menuOpened: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
  menuRef: any;
}) {
  const pathName = usePathname();
  return (
    <ul className="flex max-w-[1400px] w-screen h-full m-auto items-center z-[10] relative">
      <li className="flex h-full">
        <Link
          className="transition-all flex items-center h-full px-6 text-xl text-gray-500 hover:bg-blue-300 hover:text-white active:bg-blue-400"
          style={{
            backgroundColor: pathName === "/" ? "rgb(96 165 250)" : "",
            color: pathName === "/" ? "white" : "",
          }}
          href="/"
        >
          Home
        </Link>
      </li>
      <li className="flex h-full">
        <Link
          className="transition-all flex items-center px-6 text-xl text-gray-500 hover:bg-blue-300 hover:text-white active:bg-blue-400"
          style={{
            backgroundColor: pathName.includes("/workshop")
              ? "rgb(96 165 250)"
              : "",
            color: pathName.includes("/workshop") ? "white" : "",
          }}
          href="/workshop"
        >
          Workshop
        </Link>
      </li>
      <li className="flex h-full">
        <Link
          className="transition-all flex items-center px-6 text-xl text-gray-500 hover:bg-blue-300 hover:text-white active:bg-blue-400"
          style={{
            backgroundColor:
              pathName === "/collections" ? "rgb(96 165 250)" : "",
            color: pathName === "/collections" ? "white" : "",
          }}
          href="/collections"
        >
          Collections
        </Link>
      </li>
      <li className="min-w-52 ml-auto flex items-center z-[-3] mx-2 h-full relative">
        {user ? (
          <>
            <div className="w-full h-full p-1">
              <ProfilePreview
                user={user}
                onClick={() => onClick((prev) => !prev)}
              ></ProfilePreview>
            </div>

            {/* MENU */}
            {menuOpened && (
              <div
                ref={menuRef}
                className="shadow-md absolute w-full top-full right-0 bg-white"
                tabIndex={0}
                onBlur={() => {
                  setTimeout(() => onClick(false), 100);
                }}
              >
                <ul>
                  <Link
                    className="mt-auto flex transition-all items-center w-full 
                      py-4 px-16 text-xl text-gray-500 hover:bg-blue-300 
                      hover:text-white active:bg-blue-400 cursor-pointer justify-center"
                    href={""}
                  >
                    Profile
                  </Link>
                  <Link
                    className="mt-auto flex transition-all items-center w-full 
                      py-4 px-16 text-xl text-gray-500 hover:bg-blue-300 
                      hover:text-white active:bg-blue-400 cursor-pointer justify-center"
                    href={"/"}
                  >
                    Balance
                  </Link>
                  <li>
                    <ClerkLoading>
                      <div className="w-full h-full flex justify-center items-center">
                        <Spinner></Spinner>
                      </div>
                    </ClerkLoading>
                    <ClerkLoaded>
                      <SignOutButton>
                        <div
                          className="transition-all flex items-center w-full 
                      py-4 px-16 text-xl text-gray-500 hover:bg-gray-300 
                      hover:text-white active:bg-gray-400 cursor-pointer text-nowrap 
                      justify-center"
                        >
                          Sign Out
                        </div>
                      </SignOutButton>
                    </ClerkLoaded>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <ClerkLoading>
              <Spinner></Spinner>
            </ClerkLoading>
            <ClerkLoaded>
              <Link className="ml-auto mr-2" href={"/sign-in"}>
                <Button>Sign In</Button>
              </Link>
            </ClerkLoaded>
          </>
        )}
      </li>
    </ul>
  );
}

function ProfilePreview({
  user,
  onClick,
}: {
  user: User;
  onClick: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => onClick((prev) => !prev)}
      className="select-none transition-all rounded justify-center w-full flex items-center gap-4 px-4 h-full cursor-pointer hover:bg-gray-200"
    >
      <div className="flex items-center gap-1 text-2xl text-gray-500 font-bold">
        <Coin></Coin>
        <div>{user.balance}</div>
      </div>
      {user.imgUrl ? (
        <img
          className="rounded-full"
          src={user.imgUrl}
          width="40"
          height="40"
          alt=""
        ></img>
      ) : null}
    </button>
  );
}
