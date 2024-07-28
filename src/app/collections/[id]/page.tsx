import { Button } from "@/components/button";
import {
  deleteCollection,
  getCollection,
} from "../../../../actions/collectionActions";
import CollectionDeleteButton from "./collection-delete-button";

export default async function CollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const collection = await getCollection(params.id);
  return (
    <div className="grow w-full h-full max-w-[1000px] p-8 m-auto flex">
      <div className="grow bg-white w-full min-h-[300px] rounded-xl p-8">
        <div className="text-4xl font-bold mb-4">{collection.title}</div>
        <CollectionDeleteButton id={collection.id}></CollectionDeleteButton>
      </div>
    </div>
  );
}
