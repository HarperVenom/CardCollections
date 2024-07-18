"use client";

import MenuIcon from "@/assets/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavLinks() {
  const pathName = usePathname();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMenuOpened(false);
  }, [pathName]);

  return (
    <>
      {windowWidth < 768 ? (
        <div>
          <button
            className="p-2 mx-2 hover:bg-gray-200 rounded z-10"
            onClick={() => setMenuOpened((prev) => !prev)}
          >
            <MenuIcon stroke="rgb(107 114 128)"></MenuIcon>
          </button>
          <div
            className="absolute w-screen h-screen top-0 bg-black opacity-30 transition-all cursor-pointer z-[-2]"
            style={{
              opacity: menuOpened ? "0.3" : "0",
              pointerEvents: menuOpened ? "all" : "none",
            }}
            onClick={() => setMenuOpened(false)}
          ></div>
          <ul
            className="pt-16 absolute min-w-64 h-screen flex flex-col bg-gray-300 transition-all top-0 z-[-1]"
            style={{
              transform: menuOpened ? "translate(0, 0)" : "translate(-100%, 0)",
            }}
          >
            <li className="flex">
              <Link
                className="flex items-center w-full h-full py-4 px-8 text-xl text-gray-500 hover:bg-gray-200 active:bg-gray-100"
                style={{
                  backgroundColor: pathName === "/" ? "rgb(229 231 235)" : "",
                }}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="flex">
              <Link
                className="flex items-center w-full py-4 px-8 text-xl text-gray-500 hover:bg-gray-200 active:bg-gray-100"
                style={{
                  backgroundColor: pathName.includes("/workshop")
                    ? "rgb(229 231 235)"
                    : "",
                }}
                href="/workshop"
              >
                Workshop
              </Link>
            </li>
            <li className="flex">
              <Link
                className="flex items-center w-full py-4 px-8 text-xl text-gray-500 hover:bg-gray-200 active:bg-gray-100"
                style={{
                  backgroundColor:
                    pathName === "/collections" ? "rgb(229 231 235)" : "",
                }}
                href="/collections"
              >
                Collections
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex h-full">
          <Links></Links>
        </div>
      )}
    </>
  );
}

function Links() {
  const pathName = usePathname();
  return (
    <>
      <li className="flex">
        <Link
          className="flex items-center h-full px-6 text-xl text-gray-500 hover:bg-gray-200 active:bg-gray-100"
          style={{
            backgroundColor: pathName === "/" ? "rgb(229 231 235)" : "",
          }}
          href="/"
        >
          Home
        </Link>
      </li>
      <li className="flex">
        <Link
          className="flex items-center px-6 text-xl text-gray-500 hover:bg-gray-200 active:bg-gray-100"
          style={{
            backgroundColor: pathName.includes("/workshop")
              ? "rgb(229 231 235)"
              : "",
          }}
          href="/workshop"
        >
          Workshop
        </Link>
      </li>
      <li className="flex">
        <Link
          className="flex items-center px-6 text-xl text-gray-500 hover:bg-gray-200 active:bg-gray-100"
          style={{
            backgroundColor:
              pathName === "/collections" ? "rgb(229 231 235)" : "",
          }}
          href="/collections"
        >
          Collections
        </Link>
      </li>
    </>
  );
}
