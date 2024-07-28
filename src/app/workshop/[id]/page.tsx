import Card from "@/components/card";
import Link from "next/link";
import { getCard } from "../../../../actions/cardActions";
import CardDeleteButton from "./card-delete";

export default async function CardPage({ params }: { params: { id: string } }) {
  const card = await getCard(params.id);
  return (
    <>
      <div className="flex flex-col flex-grow items-center justify-center">
        <Card data={card}></Card>
        <div className="flex mt-16">
          <Link
            className="bg-primary-500 text-white text-lg 
          mx-2 px-8 py-2 rounded"
            href={`/workshop/edit-card/${card.id}`}
          >
            Edit
          </Link>
          <CardDeleteButton id={card.id}></CardDeleteButton>
        </div>
      </div>
    </>
  );
}
