"use client";

import { useState } from "react";
import { deleteCollection } from "../../../../actions/collectionActions";

export default function CollectionDeleteButton({ id }: { id: string }) {
  const [pending, setPending] = useState(false);
  return (
    <button
      className="bg-red-500 text-white text-lg 
          mx-2 px-8 py-2 rounded disabled:opacity-50"
      disabled={pending}
      onClick={() => {
        setPending(true);
        deleteCollection(id);
      }}
    >
      Delete
    </button>
  );
}
