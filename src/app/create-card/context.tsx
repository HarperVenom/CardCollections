"use client";

import { createContext, useState } from "react";
import { ConvertedCardType } from "../../../types/types";

interface CardContext {
  card: ConvertedCardType;
  setCard: React.Dispatch<React.SetStateAction<ConvertedCardType>>;
  templates: ConvertedCardType[];
}

export const CardContext = createContext<CardContext>({
  card: { id: "", rarity: "common" },
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
    rarity: "common",
  });

  return (
    <CardContext.Provider value={{ card, setCard, templates }}>
      {children}
    </CardContext.Provider>
  );
}
