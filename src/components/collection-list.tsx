import { CollectionType } from "../../types/collectionTypes";
import Collection from "./collection";

export default function CollectionList({
  collections,
}: {
  collections: CollectionType[];
}) {
  return (
    <div
      className="origin-top-left p-4 w-full max-w-[1000px] mx-auto grid 
      grid-flow-dense grid-cols-[repeat(auto-fit,300px)] gap-8 place-content-center"
    >
      {collections.map((collection) => (
        <Collection collection={collection}></Collection>
      ))}
    </div>
  );
}
