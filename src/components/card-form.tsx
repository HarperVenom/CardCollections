"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { CardFields, ConvertedCardType } from "../../types/types";
import TemplateWindow from "../app/create-card/templates-window";
import { FormFieldsContext } from "@/app/create-card/context";

interface FormErrors {
  name?: string[];
  nickname?: string[];
}

interface FormState {
  errors: FormErrors;
}

interface FormEntry {
  id: number;
  name: string;
  value: string;
}

interface CardFormProps {
  formAction: any;
  initialData: {
    name: string;
    nickname: string;
  };
}
export default function CardForm({ formAction, initialData }: CardFormProps) {
  const { cardFields, setCardFields, templates } =
    useContext(FormFieldsContext);
  const [formState, action] = useFormState<FormState>(formAction, {
    errors: {},
  });

  const [templateWindowOpened, setTemplateWindowOpened] = useState(false);
  const [templateApplied, setTemplateApplied] = useState(false);

  const [formEntries, setFormEntries] = useState<FormEntry[]>([
    ...Object.entries(cardFields).map(([key, value], i) => ({
      id: i,
      name: key,
      value: value,
    })),
  ]);

  useEffect(() => {
    setCardFields((prev) => ({
      ...formEntries.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {} as CardFields),
    }));
  }, [formEntries]);

  function handleAddField() {
    setFormEntries((prev) => [
      ...prev,
      { id: prev.length, name: "", value: "" },
    ]);
  }

  function handleKeyChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldId: number
  ) {
    const updated = formEntries.map((field) => {
      if (field.id === fieldId) {
        field.name = e.target.value;
      }
      return field;
    });
    setFormEntries(updated);
  }

  function handleValueChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldId: number
  ) {
    const updated = formEntries.map((field) => {
      if (field.id === fieldId) {
        field.value = e.target.value;
      }
      return field;
    });
    setFormEntries(updated);
  }

  async function handleTemplateChoose(template: ConvertedCardType) {
    const formEntries: FormEntry[] = Object.entries(template.fields).map(
      ([key, value], i) => ({ id: i, name: key, value: value })
    );

    setFormEntries(formEntries);
    setTemplateApplied(true);
    setTemplateWindowOpened(false);
  }

  return (
    <>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-400 text-white p-1 px-2 rounded shadow-md"
          onClick={() => setTemplateWindowOpened(true)}
        >
          Choose a template
        </button>
        {templateWindowOpened && (
          <TemplateWindow
            onTemplateChoose={handleTemplateChoose}
          ></TemplateWindow>
        )}
      </div>
      <form
        className="flex flex-col items-center p-4 max-w-sm m-auto"
        action={action}
      >
        {formEntries.map((field) => (
          <div className="flex w-full" key={field.id}>
            <div className="flex items-center  w-1/2">
              {templateApplied ? (
                <span>{field.name}</span>
              ) : (
                <input
                  className="rounded-sm my-1 h-7 p-1 w-full"
                  type="text"
                  name="name"
                  value={field.name}
                  onChange={(e) => handleKeyChange(e, field.id)}
                />
              )}
              <div className="mr-2">: </div>
            </div>

            <div className="w-1/2">
              <input
                className="rounded-sm my-1 h-7 p-1 w-full"
                type="text"
                name="value"
                value={field.value}
                onChange={(e) => handleValueChange(e, field.id)}
              />
            </div>
          </div>
        ))}
        <div className="mt-4">
          {templateApplied ? (
            <button
              className="bg-gray-400 text-white p-1 px-2 rounded shadow-md"
              type="button"
              onClick={() => setTemplateApplied(false)}
            >
              Edit Template
            </button>
          ) : (
            <button
              className="bg-gray-400 text-white p-1 px-2 rounded shadow-md"
              type="button"
              onClick={handleAddField}
            >
              Add Field
            </button>
          )}
        </div>

        {/* <label htmlFor="name">Real Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={() => updateData((prev: any) => ({ ...prev }))}
        />
        {formState.errors.name && <p>{formState.errors.name.join(", ")}</p>}

        <label htmlFor="nickname">Nickname:</label>
        <input type="text" name="nickname" id="nickname" />
        {formState.errors.nickname && (
          <p>{formState.errors.nickname.join(", ")}</p>
        )} */}
        <button
          className="bg-green-500 text-white p-1 px-8 rounded shadow-md mt-4"
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
}
