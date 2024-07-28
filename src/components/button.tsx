import Link from "next/link";
import React from "react";

export function Button({
  children,
  href,
  type,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: any;
}) {
  return (
    <>
      {href ? (
        <Link
          className=" bg-primary-500 text-lg text-white 
    py-2 px-4 rounded cursor-pointer text-nowrap"
          href={href}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className=" bg-primary-500 text-lg text-white 
    py-2 px-4 rounded cursor-pointer text-nowrap"
          type={type}
        >
          {children}
        </button>
      )}
    </>
  );
}
