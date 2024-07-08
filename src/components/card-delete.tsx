"use client";

import { deleteCard } from "../../actions/cardActions";

export default function CardDeleteButton({ id }: { id: string }) {
  return (
    <button
      className="bg-red-500 text-white text-lg 
          mx-2 px-8 py-2 rounded"
      onClick={() => deleteCard(id)}
    >
      Delete
    </button>
  );
}
