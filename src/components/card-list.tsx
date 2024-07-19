import Link from "next/link";
import { getCards } from "../../actions/cardActions";
import Card from "./card";
import { ConvertedCardType } from "../../types/cardTypes";

export default async function CardsList({
  cards: cards,
}: {
  cards: ConvertedCardType[];
}) {
  const currentCards = cards ? cards : await getCards();
  return (
    <>
      <div
        className="origin-top-left p-4 max-w-[1000px] m-auto grid 
      grid-flow-dense grid-cols-auto gap-8 place-content-center"
      >
        {currentCards.map((card) => (
          <Link key={card.id} className="m-4" href={`/workshop/${card.id}`}>
            <Card data={card} width={200}></Card>
          </Link>
        ))}
      </div>
    </>
  );
}
