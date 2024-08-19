import { getCard } from "../../../../../actions/cardActions";
import { ConvertedCardType } from "../../../../../types/cardTypes";
import CardEditor from "../card-editor";
import CardProvider from "../context";

export default async function EditCard({ params }: { params: { id: string } }) {
  const card = await getCard(params.id);

  const templates = [] as ConvertedCardType[];

  return (
    <div className="bg-gray-200">
      <CardProvider initialCard={card} templates={templates}>
        <CardEditor action="update"></CardEditor>
      </CardProvider>
    </div>
  );
}
