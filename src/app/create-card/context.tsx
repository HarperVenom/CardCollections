"use client";

import { createContext, useState } from "react";
import { ConvertedCardType } from "../../../types/types";

interface CardContext {
  card: ConvertedCardType;
  setCard: React.Dispatch<React.SetStateAction<ConvertedCardType>>;
  templates: ConvertedCardType[];
}

export const CardContext = createContext<CardContext>({
  card: { id: "", isTemplate: false, image: "", fields: {} },
  setCard: () => {},
  templates: [],
});

export default function FormFieldsProvider({
  children,
  templates,
}: {
  children: React.ReactNode;
  templates: ConvertedCardType[];
}) {
  const [card, setCard] = useState<ConvertedCardType>({
    id: "",
    isTemplate: false,
    image: "",
    fields: {},
  });

  return (
    <CardContext.Provider value={{ card, setCard, templates }}>
      {children}
    </CardContext.Provider>
  );
}
