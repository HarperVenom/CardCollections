"use client";

import { useState } from "react";
import { deleteCard } from "../../../../actions/cardActions";
import { Spinner } from "@nextui-org/spinner";

export default function CardDeleteButton({ id }: { id: string }) {
  const [pending, setPending] = useState(false);
  return (
    <button
      className="bg-red-500 text-white text-lg 
          mx-2 px-8 py-2 rounded disabled:opacity-50"
      disabled={pending}
      onClick={() => {
        setPending(true);
        deleteCard(id);
      }}
    >
      Delete
    </button>
  );
}
