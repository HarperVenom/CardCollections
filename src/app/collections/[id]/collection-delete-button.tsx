"use client";

import { useState } from "react";
import { deleteCollection } from "../../../../actions/collectionActions";

export default function CollectionDeleteButton({ id }: { id: string }) {
  const [pending, setPending] = useState(false);
  return (
    <button
      className="button bg-red-500 disabled:opacity-50"
      color="red"
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
