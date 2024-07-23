"use client";
import { useContext, useEffect, useState } from "react";
import { CardContext } from "./context";
import { rubik } from "../../ui/fonts";

import Card from "@/components/card";
import { createCard, updateCard } from "../../../../actions/cardActions";
import CardForm from "./card-form";
import "./editor.css";

export default function CardEditor({
  action,
}: {
  action: "create" | "update";
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { card } = useContext(CardContext);

  const updateAction = updateCard.bind(null, card.id);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="max-w-[1200px] w-screen m-auto flex flex-col 
    grow md:overflow-hidden md:flex-row"
    >
      <div className="grow p-4 flex min-h-[600px] justify-center items-center">
        <Card data={card}></Card>
      </div>
      <div
        className="w-full md:w-1/3 md:min-w-[400px] py-6 bg-gray-300 
       overflow-x-hidden overflow-y-auto"
        style={{ maxHeight: windowWidth >= 768 ? "calc(100vh - 4rem)" : "" }}
      >
        <h2
          className={`font-bold text-3xl text-center text-gray-500 mb-8
            ${rubik.className}`}
        >
          Edit your card:
        </h2>
        <CardForm
          formAction={action === "create" ? createCard : updateAction}
        ></CardForm>
      </div>
    </div>
  );
}
