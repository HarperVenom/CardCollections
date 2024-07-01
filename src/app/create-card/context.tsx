"use client";

import { createContext, useState } from "react";
import { CardFields, ConvertedCardType } from "../../../types/types";

interface CardContext {
  cardFields: CardFields;
  setCardFields: React.Dispatch<React.SetStateAction<CardFields>>;
  templates: ConvertedCardType[];
}

export const FormFieldsContext = createContext<CardContext>({
  cardFields: {},
  setCardFields: () => {},
  templates: [],
});

export default function FormFieldsProvider({
  children,
  templates,
}: {
  children: React.ReactNode;
  templates: ConvertedCardType[];
}) {
  const [cardFields, setCardFields] = useState<CardFields>({});

  return (
    <FormFieldsContext.Provider
      value={{ cardFields, setCardFields, templates }}
    >
      {children}
    </FormFieldsContext.Provider>
  );
}
