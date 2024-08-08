import Link from "next/link";
import { getCards } from "../../actions/cardActions";
import Card from "./card";
import { ConvertedCardType } from "../../types/cardTypes";
import { Dispatch, SetStateAction } from "react";

type ListProps = {
  cards: ConvertedCardType[];
  onCardSelect?: Dispatch<SetStateAction<ConvertedCardType | undefined>>;
  cardSize?: number;
};

export default function CardsList({
  cards: cards,
  onCardSelect,
  cardSize = 200,
}: ListProps) {
  const currentCards = cards;
  return (
    <>
      <div
        className={`
          grid grid-flow-dense grid-cols-auto place-content-center origin-top-left p-4 max-w-[1000px] m-auto gap-8`}
        style={{
          gridTemplateColumns: `repeat(auto-fill, ${cardSize}px)`,
          gap: `${0.2 * cardSize}px`,
        }}
      >
        {currentCards &&
          currentCards.map((card) => (
            <div key={card.id}>
              {onCardSelect ? (
                <button onClick={onCardSelect && (() => onCardSelect(card))}>
                  <Card data={card} width={cardSize}></Card>
                </button>
              ) : (
                <Link href={`/workshop/${card.id}`}>
                  <Card data={card} width={cardSize}></Card>
                </Link>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
