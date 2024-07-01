import Card from "@/components/card";
import { getCard } from "../../../../actions/cardActions";

export default async function CardPage({ params }: { params: { id: string } }) {
  const card = await getCard(params.id);
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <Card data={card}></Card>
      </div>
    </>
  );
}
