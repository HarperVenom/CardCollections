"use client";
import { useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { CardFields, ConvertedCardType } from "../../types/types";
import TemplateWindow from "../app/create-card/templates-window";
import { CardContext } from "@/app/create-card/context";
import { useEdgeStore } from "@/lib/edgestore";

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
  const { card, setCard } = useContext(CardContext);

  const [formState, action] = useFormState<FormState>(formAction, {
    errors: {},
  });

  const [templateWindowOpened, setTemplateWindowOpened] = useState(false);
  const [templateApplied, setTemplateApplied] = useState(false);

  const [formEntries, setFormEntries] = useState<FormEntry[]>([
    ...Object.entries(card.fields!).map(([key, value], i) => ({
      id: i,
      name: key,
      value: value,
    })),
  ]);

  const [image, setImage] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    setCard((prev) => ({
      ...prev,
      fields: {
        ...formEntries.reduce((acc, field) => {
          acc[field.name] = field.value;
          return acc;
        }, {} as CardFields),
      },
    }));
  }, [formEntries]);

  useEffect(() => {
    if (!image) return;
    let tmp = URL.createObjectURL(image);

    const objectUrl = tmp;
    setCard((prev) => ({ ...prev, image: { url: objectUrl } }));
    // free memory
    for (let i = 0; i < objectUrl.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrl[i]);
      };
    }
  }, [image]);

  // useEffect(() => {
  //   (async () => {
  //     if (image) {
  //       const res = await edgestore.publicFiles.upload({
  //         file: image,
  //         onProgressChange: (progress) => {
  //           // you can use this to show a progress bar
  //           console.log(progress);
  //         },
  //       });
  //       // you can run some server action or api here
  //       // to add the necessary data to your database

  //       console.log(res);
  //     }
  //   })();
  // }, [image]);

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
    const formEntries: FormEntry[] = Object.entries(template.fields!).map(
      ([key, value], i) => ({ id: i, name: key, value: value })
    );

    setFormEntries(formEntries);
    setTemplateApplied(true);
    setTemplateWindowOpened(false);
  }

  return (
    <>
      <form className="flex flex-col items-center p-4 m-auto" action={action}>
        <FormSection name="Title" inputId="title">
          <input
            className="rounded my-1 h-7 p-1 w-full text-center"
            type="text"
            id="title"
            name="title"
          />
        </FormSection>

        <FormSection name="Image" inputId="image">
          <input
            className="rounded m-auto my-1 text-center"
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </FormSection>

        <FormSection name="Description" inputId="description">
          <textarea
            className="rounded my-1 p-1 w-full text-center"
            name="description"
            id="description"
          ></textarea>
        </FormSection>

        <FormSection name="Attributes" inputId="value">
          {/* Templates */}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white p-1 px-2 rounded shadow-md"
              onClick={() => setTemplateWindowOpened(true)}
              type="button"
            >
              Choose a template
            </button>
            {templateWindowOpened && (
              <TemplateWindow
                onTemplateChoose={handleTemplateChoose}
              ></TemplateWindow>
            )}
          </div>

          {/* Fields */}
          <div className="my-4 w-full">
            {formEntries.map((field) => (
              <div className="flex w-full" key={field.id}>
                <div className="flex items-center  w-1/2">
                  {templateApplied ? (
                    <span>{field.name}</span>
                  ) : (
                    <input
                      className="rounded my-1 h-7 p-1 w-full"
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
                    className="rounded my-1 h-7 p-1 w-full"
                    type="text"
                    name="value"
                    id="value"
                    value={field.value}
                    onChange={(e) => handleValueChange(e, field.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Button */}
          <div className="flex justify-center">
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
        </FormSection>

        <FormSection name="Category" inputId="category">
          <input
            className="rounded my-1 p-1 w-full text-center"
            list="options"
            id="category"
            name="category"
          />
          <datalist id="options">
            <option value="Option 1" />
            <option value="Option 2" />
            <option value="Option 3" />
          </datalist>
        </FormSection>

        <FormSection name="Settings">
          <div className="flex">
            <div className="flex flex-col items-center">
              <label className="font-bold" htmlFor="font1">
                Font 1
              </label>
              <input
                className="rounded m-1 p-1 w-4/5 text-center"
                type="select"
                name="font1"
                id="font1"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="font-bold" htmlFor="font2">
                Font 2
              </label>
              <input
                className="rounded m-1 p-1 w-4/5 text-center"
                type="select"
                name="font2"
                id="font2"
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center mt-4">
            <label className="font-bold" htmlFor="color">
              Background
            </label>
            <input
              className="rounded m-1 px-1 w-4/5 text-center"
              type="color"
              id="color"
              name="color"
            />
          </div>
        </FormSection>

        <FormSection name="Rarity">
          {
            <fieldset className="w-full flex justify-center">
              <label
                className="w-8 h-8 hover:outline bg-white
                rounded-full outline-gray-500 pointer-events-none mx-2"
              >
                <input
                  className="w-full h-full opacity-0 cursor-pointer pointer-events-auto"
                  type="radio"
                  name="rarity"
                  value="common"
                />
              </label>
              <label
                className="w-8 h-8 hover:outline bg-green-500
                rounded-full outline-gray-500 pointer-events-none mx-2"
              >
                <input
                  className="w-full h-full opacity-0 cursor-pointer pointer-events-auto"
                  type="radio"
                  name="rarity"
                  value="rare"
                />
              </label>
              <label
                className="w-8 h-8 hover:outline bg-purple-500
                rounded-full outline-gray-500 pointer-events-none mx-2"
              >
                <input
                  className="w-full h-full opacity-0 cursor-pointer pointer-events-auto"
                  type="radio"
                  name="rarity"
                  value="epic"
                />
              </label>
              <label
                className="w-8 h-8 hover:outline bg-yellow-500
                rounded-full outline-gray-500 pointer-events-none mx-2"
              >
                <input
                  className="w-full h-full opacity-0 cursor-pointer pointer-events-auto"
                  type="radio"
                  name="rarity"
                  value="legendary"
                />
              </label>
            </fieldset>
          }
        </FormSection>

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
          className="bg-blue-500 text-white p-1 px-8 rounded shadow-md mt-4"
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
}

function FormSection({
  children,
  name,
  inputId,
}: {
  children: React.ReactNode;
  name: string;
  inputId?: string;
}) {
  return (
    <div
      className="rounded-lg border-2 border-gray-400
         w-full p-4 py-10 flex flex-col items-center 
         justify-center m-1 mt-6 relative"
    >
      <div className="w-full max-w-[300px]">
        <label
          className="font-bold text-center text-2xl absolute 
        top-0 -translate-y-2/3 bg-gray-300 px-2 text-gray-500"
          htmlFor={inputId}
        >
          {name}
        </label>
        {children}
      </div>
    </div>
  );
}
