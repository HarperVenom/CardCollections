"use client";
import CardForm from "@/components/card-form";
import { createCard } from "../../../actions/cardActions";
import Card from "@/components/card";
import { useContext, useState } from "react";
import { CardFields } from "../../../types/types";
import { FormFieldsContext } from "./context";

export default function CreateCard() {
  const { cardFields, setCardFields } = useContext(FormFieldsContext);

  return (
    <>
      <div className="flex h-screen overflow-hidden p-4">
        <div className="w-1/2 p-4 bg-gray-300 rounded shadow-xl">
          <h2 className="font-bold text-lg text-center">
            Create your character:
          </h2>
          <CardForm
            formAction={createCard}
            initialData={{ name: "", nickname: "" }}
          ></CardForm>
        </div>

        <div className="w-1/2 p-4 flex justify-center items-center">
          <Card data={{ id: "", fields: cardFields, isTemplate: false }}></Card>
        </div>
      </div>
    </>
  );
}
