import { ConvertedCardType } from "../../../../types/cardTypes";
import CardEditor from "./card-editor";
import CardProvider from "./context";

export default function CreateCard() {
  const templates = [] as ConvertedCardType[];

  return (
    <CardProvider
      initialCard={{ id: "", rarity: "common" }}
      templates={templates}
    >
      <CardEditor action="create"></CardEditor>
    </CardProvider>
  );
}
