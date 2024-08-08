import CardsList from "@/components/card-list";
import {
  getCollection,
  getCollectionСards,
} from "../../../../actions/collectionActions";
import CollectionDeleteButton from "./collection-delete-button";
import Link from "next/link";
import { convertCard } from "@/utils/utils";

export default async function CollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const collection = await getCollection(params.id);
  const collectionCards = await getCollectionСards(params.id);

  return (
    <div className="grow w-full h-full max-w-[1000px] p-8 m-auto flex">
      <div className="flex flex-col grow bg-white w-full min-h-[300px] rounded-xl p-8">
        <div className="text-4xl font-bold">{collection.title}</div>
        <div className="text-zinc-900 text-lg p-4">
          {collection.description}
        </div>
        <div className="w-full overflow-auto mb-4 ">
          <CardsList cards={collectionCards} cardSize={50}></CardsList>
        </div>

        <div className="flex gap-4 mt-auto justify-between">
          <Link className="button" href={`/collections/${params.id}/add-card`}>
            Add Card
          </Link>
          <CollectionDeleteButton id={collection.id}></CollectionDeleteButton>
        </div>
      </div>
    </div>
  );
}
