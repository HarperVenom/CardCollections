"use client";

import MenuIcon from "@/assets/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./menu-button.css";

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
            className="menu-button transition-all p-2 mx-2 hover:bg-blue-300 hover:text-white active:bg-blue-400 rounded z-10"
            onClick={() => setMenuOpened((prev) => !prev)}
          >
            <MenuIcon stroke="rgb(107 114 128)"></MenuIcon>
          </button>
          <div
            className="fixed w-screen h-screen top-0 bg-black opacity-30 transition-all cursor-pointer z-[-2]"
            style={{
              opacity: menuOpened ? "0.3" : "0",
              pointerEvents: menuOpened ? "all" : "none",
            }}
            onClick={() => setMenuOpened(false)}
          ></div>
          <ul
            className=" pt-16 fixed min-w-64 h-screen flex flex-col bg-white transition-all top-0 z-[-1]"
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
      <li className="flex">
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
      <li className="flex">
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
    </>
  );
}
