"use client";
import { useContext, useEffect, useState } from "react";
import { CardContext } from "./context";
import { rubik } from "../../ui/fonts";

import Card from "@/components/card";
import { createCard, updateCard } from "../../../../actions/cardActions";
import CardForm from "./card-form";

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
    <div className="flex flex-col-reverse flex-grow md:overflow-hidden md:flex-row">
      <div
        className="w-full md:w-1/3 md:min-w-[400px] py-6 bg-gray-300 rounded 
      shadow-xl overflow-x-hidden overflow-y-auto"
      >
        <h2
          className={`font-bold text-3xl text-center text-gray-500
            ${rubik.className}`}
        >
          Create your card:
        </h2>
        <CardForm
          formAction={action === "create" ? createCard : updateAction}
        ></CardForm>
      </div>

      <div className="grow p-4 flex min-h-[500px] justify-center items-center bg-gray-400">
        <Card data={card}></Card>
      </div>
    </div>
  );
}
