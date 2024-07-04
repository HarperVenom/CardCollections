"use client";
import CardForm from "@/components/card-form";
import { createCard } from "../../../actions/cardActions";
import Card from "@/components/card";
import { useContext, useState } from "react";
import { CardFields } from "../../../types/types";
import { CardContext } from "./context";

export default function CreateCard() {
  const { card, setCard } = useContext(CardContext);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="w-1/3 min-w-[400px] py-6 px-[1%] bg-gray-300 rounded shadow-xl overflow-x-hidden overflow-y-auto">
          <h2 className="font-bold text-2xl text-center">
            Create your character:
          </h2>
          <CardForm
            formAction={createCard}
            initialData={{ name: "", nickname: "" }}
          ></CardForm>
        </div>

        <div className="grow p-4 flex justify-center items-center">
          <Card data={card}></Card>
        </div>
      </div>
    </>
  );
}
