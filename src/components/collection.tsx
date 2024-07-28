import Link from "next/link";
import { getCollectionСards } from "../../actions/collectionActions";
import { CollectionType } from "../../types/collectionTypes";

export default async function ({ collection }: { collection: CollectionType }) {
  const collectionCards = await getCollectionСards(collection.id);
  return (
    <Link
      href={`/collections/${collection.id}`}
      className="w-[300px] h-[300px] bg-white flex flex-col p-4 rounded cursor-pointer"
    >
      <div className="text-xl font-bold">{collection.title}</div>
      <div className="text-zinc-500">
        Number of cards: {collectionCards.length}
      </div>
    </Link>
  );
}
