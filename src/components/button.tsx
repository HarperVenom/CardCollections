import React from "react";

export function Button({ children }: { children: React.ReactNode }) {
  return (
    <div
      className=" bg-blue-500 text-lg text-white 
    py-2 px-4 rounded cursor-pointer text-nowrap"
    >
      {children}
    </div>
  );
}
