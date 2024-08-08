"use client";
import FormSection from "@/components/form-section";
import { createCollection } from "../../../actions/collectionActions";
import { useFormState } from "react-dom";

export default function CollectionForm() {
  const [formState, action] = useFormState(createCollection as any, {
    errors: {},
  });

  return (
    <form
      action={action}
      className="flex flex-col  items-center w-3/4 max-w-[500px] gap-4"
    >
      <h2 className="text-2xl text-zinc-500 font-bold text-center mb-4">
        Create your Collection:
      </h2>
      <FormSection name="Title" inputId="name">
        <input
          className="rounded-lg my-1 p-2 w-full text-center"
          type="text"
          id="title"
          name="title"
        />
      </FormSection>
      <FormSection name="Description" inputId="description">
        <textarea
          className="rounded-lg my-1 p-2 w-full text-center"
          name="description"
          id="description"
        ></textarea>
      </FormSection>

      <button className="button" type="submit">
        Create
      </button>
    </form>
  );
}
