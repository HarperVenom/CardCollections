"use client";
import CardsList from "@/components/card-list";
import { CollectionType } from "../../../../../types/collectionTypes";
import { ConvertedCardType } from "../../../../../types/cardTypes";
import {
  forwardRef,
  MutableRefObject,
  RefObject,
  useRef,
  useState,
} from "react";
import Card from "@/components/card";
import { useAuth, useUser } from "@clerk/nextjs";
import { addCardToCollection } from "../../../../../actions/publicCardsActions";

type CardSelectorProps = {
  collection: CollectionType;
  cards: ConvertedCardType[];
};

export default function CardSelector({ collection, cards }: CardSelectorProps) {
  const [selectedCard, setSelectedCard] = useState<ConvertedCardType>();
  const cardRef: RefObject<HTMLDivElement> = useRef(null);
  const { userId } = useAuth();

  function handleAddClick() {
    if (!userId) return;
    if (!selectedCard) return;

    addCardToCollection(collection.id, selectedCard.id, userId);
  }

  return (
    <div className="grow flex flex-col">
      <div className="sticky top-16 w-full min-h-16 bg-white z-[1] shadow-md p-4">
        <h1 className="text-lg text-center">
          Choose a card to add to collection
        </h1>
        <h1 className="text-xl text-center font-bold">
          &quot;{collection.title}&quot;
        </h1>
      </div>

      <div className="grow pb-16">
        <CardsList onCardSelect={setSelectedCard} cards={cards}></CardsList>
      </div>
      <div className="p-4 flex flex-col justify-center items-center text-lg sticky w-full bottom-0 bg-white shadow-md">
        <div className="pb-2">Selected Card:</div>
        <div className="font-bold pb-2">
          {selectedCard && selectedCard.title?.value}
        </div>
        <button className="button" onClick={handleAddClick}>
          Add to Collection
        </button>
      </div>
    </div>
  );
}
