import Link from "next/link";
import { getCards } from "../../actions/cardActions";
import Card from "./card";

export default async function CardsList() {
  const cards = await getCards();
  return (
    <>
      <div
        className="origin-top-left p-4 max-w-[1000px] m-auto grid 
      grid-flow-dense grid-cols-auto gap-8 place-content-center"
      >
        {cards.map((card) => (
          <Link key={card.id} className="m-4" href={`/workshop/${card.id}`}>
            <Card data={card} width={200}></Card>
          </Link>
        ))}
      </div>
    </>
  );
}
