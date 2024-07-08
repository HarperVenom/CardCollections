"use client";
import { useContext } from "react";
import { ConvertedCardType } from "../../../types/types";
import CardProvider, { CardContext } from "./context";
import { rubik } from "../ui/fonts";
import CardForm from "@/components/card-form";
import Card from "@/components/card";
import { createCard, updateCard } from "../../../actions/cardActions";

export default function CardEditor({
  action,
}: {
  action: "create" | "update";
}) {
  const { card } = useContext(CardContext);

  const updateAction = updateCard.bind(null, card.id);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/3 min-w-[400px] py-6 bg-gray-300 rounded shadow-xl overflow-x-hidden overflow-y-auto">
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

      <div className="grow p-4 flex justify-center items-center bg-gray-400 -z-20">
        <Card data={card}></Card>
      </div>
    </div>
  );
}
