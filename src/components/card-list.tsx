import Link from "next/link";
import { getCards } from "../../actions/cardActions";
import Card from "./card";

export default async function CardsList() {
  const cards = await getCards();
  return (
    <>
      <div className="flex scale-50 origin-top-left p-4">
        {cards.map((card) => (
          <Link className="m-4" href={`/cards/${card.id}`}>
            <Card data={card}></Card>
          </Link>
        ))}
      </div>
    </>
  );
}
