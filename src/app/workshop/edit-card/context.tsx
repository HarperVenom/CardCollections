"use client";

import { createContext, useState } from "react";
import { ConvertedCardType } from "../../../../types/cardTypes";

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

export default function CardProvider({
  children,
  initialCard,
  templates,
}: {
  children: React.ReactNode;
  initialCard: ConvertedCardType;
  templates: ConvertedCardType[];
}) {
  const [card, setCard] = useState<ConvertedCardType>(initialCard);

  return (
    <CardContext.Provider value={{ card, setCard, templates }}>
      {children}
    </CardContext.Provider>
  );
}
