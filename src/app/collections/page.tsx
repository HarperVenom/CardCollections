import { Button } from "@/components/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { getUser } from "../../../actions/userAtions";
import { getCollections } from "../../../actions/collectionActions";
import CollectionList from "@/components/collection-list";

export default async function CollectionsPage() {
  const clerkUser = await currentUser();
  const user = clerkUser ? await getUser(clerkUser.id) : null;
  const collections = await getCollections(user?.id);

  console.log(collections);

  return (
    <div className="flex-grow flex flex-col items-center">
      <div className="flex items-center h-fit">
        <div
          className="
            flex flex-col text-2xl text-gray-500 my-8"
        >
          {`${collections.length}/3`}
        </div>
        {collections.length < 3 && (
          <Link className="my-8 mx-4" href={"/collections/create"}>
            <Button>Create Collection</Button>
          </Link>
        )}
      </div>
      <CollectionList collections={collections}></CollectionList>
    </div>
  );
}
