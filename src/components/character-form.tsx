"use client";
import { useFormState } from "react-dom";

interface FormErrors {
  name?: string[];
  nickname?: string[];
}

interface FormState {
  errors: FormErrors;
}

interface CharacterFormProps {
  formAction: any;
  initialData: {
    name: string;
    nickname: string;
  };
}
export default function CharacterForm({ formAction }: CharacterFormProps) {
  const [formState, action] = useFormState<FormState>(formAction, {
    errors: {},
  });

  return (
    <>
      <form
        className="flex flex-col p-4 bg-slate-200 max-w-sm m-auto"
        action={action}
      >
        <label htmlFor="name">Real Name:</label>
        <input type="text" name="name" id="name" />
        {formState.errors.name && <p>{formState.errors.name.join(", ")}</p>}
        <label htmlFor="nickname">Nickname:</label>
        <input type="text" name="nickname" id="nickname" />
        {formState.errors.nickname && (
          <p>{formState.errors.nickname.join(", ")}</p>
        )}
        <button type="submit">Save</button>
      </form>
    </>
  );
}
