import { getCards } from "../../../../../actions/cardActions";
import { getCollection } from "../../../../../actions/collectionActions";
import CardSelector from "./card-selection";

export default async function AddCardToCollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const workshopCards = await getCards();
  const collection = await getCollection(params.id);
  return (
    <CardSelector cards={workshopCards} collection={collection}></CardSelector>
  );
}
