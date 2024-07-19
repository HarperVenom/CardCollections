"use client";
import { useContext, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CardContext } from "@/app/workshop/edit-card/context";
import {
  baskervville,
  comicNeue,
  lato,
  lobster,
  pacifico,
  permanentMarker,
  rowdies,
} from "@/app/ui/fonts";
import "@/app/workshop/edit-card/form.css";
import Cross from "@/assets/cross";
import {
  AttributesToFormEntries as attributesToFormEntries,
  getFontClass,
  getRarityColor,
} from "@/utils/utils";
import {
  Attributes,
  CardSettings,
  ConvertedCardType,
  FormEntry,
} from "../../../../types/cardTypes";
import TemplateWindow from "./templates-window";
import { useAuth } from "@clerk/nextjs";
import { Spinner } from "@nextui-org/spinner";

interface FormErrors {
  name?: string[];
  nickname?: string[];
}

interface FormState {
  errors: FormErrors;
}

interface CardFormProps {
  formAction: any;
  initialCard?: ConvertedCardType;
}
export default function CardForm({ formAction }: CardFormProps) {
  const { userId } = useAuth();

  const { card, setCard } = useContext(CardContext);

  const [formState, action] = useFormState<FormState>(formAction, {
    errors: {},
  });

  const [templateWindowOpened, setTemplateWindowOpened] = useState(false);
  const [templateApplied, setTemplateApplied] = useState(false);

  const [title, setTitle] = useState<string>(card.title?.value || "");
  const [image, setImage] = useState<string>(card.image?.url || "");
  const [description, setDescription] = useState<string>(
    card.description?.value || ""
  );
  const [attributes, setAttributes] = useState<FormEntry[]>(
    (card.attributes && attributesToFormEntries(card.attributes)) || []
  );
  const [category, setCategory] = useState<string>(card.category?.value || "");
  const [settings, setSettings] = useState<CardSettings>(
    card.settings || {
      font1: "Lato",
      font2: "Lato",
      color: {
        background: "#FFFFFF",
        content: "#E5E7EB",
        text: "#000000",
      },
    }
  );
  const [rarity, setRarity] = useState<string>(card.rarity || "common");

  useEffect(() => {
    setCard((prev) => ({
      ...prev,
      title: { ...(prev.title && prev.title), value: title },
    }));
  }, [title]);

  useEffect(() => {
    setCard((prev) => ({ ...prev, image: { url: image } }));
  }, [image]);

  useEffect(() => {
    setCard((prev) => ({
      ...prev,
      description: {
        ...(prev.description && prev.description),
        value: description,
      },
    }));
  }, [description]);

  useEffect(() => {
    setCard((prev) => ({
      ...prev,
      attributes: {
        ...attributes.reduce((acc, field) => {
          acc[field.key] = field.value;
          return acc;
        }, {} as Attributes),
      },
    }));
  }, [attributes]);

  useEffect(() => {
    setCard((prev) => ({
      ...prev,
      category: {
        ...(prev.category && prev.category),
        value: category,
      },
    }));
  }, [category]);

  useEffect(() => {
    setCard((prev) => ({
      ...prev,
      settings: settings,
    }));
  }, [settings]);

  useEffect(() => {
    setCard((prev) => ({
      ...prev,
      rarity: rarity,
    }));
  }, [rarity]);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    let tmp = URL.createObjectURL(file);

    const objectUrl = tmp;
    setImage(objectUrl);
    // free memory
    for (let i = 0; i < objectUrl.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrl[i]);
      };
    }
  }

  function handleAddAttribute() {
    setAttributes((prev) => [...prev, { id: prev.length, key: "", value: "" }]);
  }

  function handleRemoveAttribute(id: number) {
    setAttributes((prev) => prev.filter((attr) => attr.id !== id));
  }

  function handleAttributeKeyChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldId: number
  ) {
    const updated = attributes.map((field) => {
      if (field.id === fieldId) {
        field.key = e.target.value;
      }
      return field;
    });
    setAttributes(updated);
  }

  function handleAttributeValueChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldId: number
  ) {
    const updated = attributes.map((field) => {
      if (field.id === fieldId) {
        field.value = e.target.value;
      }
      return field;
    });
    setAttributes(updated);
  }

  async function handleTemplateChoose(template: ConvertedCardType) {
    const formEntries: FormEntry[] = Object.entries(template.attributes!).map(
      ([key, value], i) => ({ id: i, key: key, value: value })
    );

    setAttributes(formEntries);
    setTemplateApplied(true);
    setTemplateWindowOpened(false);
  }

  function handleRarityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rarity = e.target.value;
    setRarity(rarity);
  }

  return (
    <>
      <form
        className="flex flex-col items-center p-4 m-auto px-[5%]"
        action={action}
      >
        <FormSection name="Title" inputId="title">
          <input
            className="rounded-lg my-1 p-2 w-full text-center"
            type="text"
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </FormSection>

        <FormSection name="Image" inputId="image">
          <label
            className="bg-blue-500 text-white py-1 px-4 rounded cursor-pointer"
            htmlFor="image"
          >
            {card.image ? "Change Image" : "Upload Image"}
          </label>
          <input
            readOnly
            className="hidden"
            type="text"
            name="imageURL"
            value={image}
          />
          <input
            className="rounded m-auto my-1 text-center hidden"
            type="file"
            id="image"
            name="image"
            onChange={handleImageUpload}
          />
        </FormSection>

        <FormSection name="Description" inputId="description">
          <textarea
            className="rounded-lg p-2 h-36 w-full text-center flex items-center"
            name="description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </FormSection>

        <FormSection name="Attributes" inputId="value">
          {/* Templates
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white p-1 px-4 rounded shadow-md"
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
          </div> */}

          {/* Fields */}
          {attributes.length > 0 && (
            <div className="my-4 w-full">
              {attributes.map((field) => (
                <div className="flex w-full items-center" key={field.id}>
                  <div className="flex items-center w-1/2">
                    {templateApplied ? (
                      <span className="text-lg">{field.key}</span>
                    ) : (
                      <input
                        className="rounded my-1 h-7 p-1 w-full"
                        type="text"
                        name="attribute-name"
                        value={field.key}
                        onChange={(e) => handleAttributeKeyChange(e, field.id)}
                      />
                    )}
                  </div>
                  <div className="mr-2 text-2xl mb-1">: </div>
                  <div className="w-1/2">
                    <input
                      className="rounded my-1 h-7 p-1 w-full"
                      type="text"
                      name="attribute-value"
                      id="value"
                      value={field.value}
                      onChange={(e) => handleAttributeValueChange(e, field.id)}
                    />
                  </div>
                  <button
                    type="button"
                    className="w-7 h-full bg-gray-400 p-1 mx-1 rounded"
                    onClick={() => handleRemoveAttribute(field.id)}
                  >
                    <Cross stroke="white" width={3}></Cross>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add/Edit Button */}
          <div className="flex justify-center">
            {templateApplied ? (
              <button
                className="bg-gray-400 text-white p-1 px-4 rounded shadow-md"
                type="button"
                onClick={() => setTemplateApplied(false)}
              >
                Edit Template
              </button>
            ) : (
              <button
                className="bg-gray-400 text-white p-1 px-4 rounded shadow-md"
                type="button"
                onClick={handleAddAttribute}
              >
                Add Field
              </button>
            )}
          </div>
        </FormSection>

        <FormSection name="Category" inputId="category">
          <input
            className="rounded-lg my-1 p-1 w-full text-center"
            list="options"
            id="category"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          <datalist id="options">
            <option value="Option 1" />
            <option value="Option 2" />
            <option value="Option 3" />
          </datalist>
        </FormSection>

        <FormSection name="Settings">
          <div className="flex flex-col w-full text-gray-500">
            <Font
              title="Font 1"
              name="font1"
              settings={settings}
              setSettings={setSettings}
            ></Font>

            <Font
              title="Font 2"
              name="font2"
              settings={settings}
              setSettings={setSettings}
            ></Font>
          </div>
          <div className="text-gray-500 w-full">
            <Color
              name="Background"
              type="background"
              settings={settings}
              setSettings={setSettings}
            ></Color>

            <Color
              name="Content"
              type="content"
              settings={settings}
              setSettings={setSettings}
            ></Color>

            <Color
              name="Text"
              type="text"
              settings={settings}
              setSettings={setSettings}
            ></Color>
          </div>
        </FormSection>

        <FormSection name="Rarity">
          {
            <fieldset className="w-full flex justify-evenly">
              <RarityRadio rarity="common"></RarityRadio>
              <RarityRadio rarity="rare"></RarityRadio>
              <RarityRadio rarity="epic"></RarityRadio>
              <RarityRadio rarity="legendary"></RarityRadio>
            </fieldset>
          }
          <div
            className={`w-full justify-center text-center
           mt-2 italic text-gray-500`}
          >
            {card.rarity}
          </div>
        </FormSection>

        <SubmitButton></SubmitButton>
      </form>
    </>
  );

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <>
        <div className="w-24 h-12 flex justify-center items-center">
          {pending ? (
            <div className="mt-4">
              <Spinner></Spinner>
            </div>
          ) : (
            <button
              className="bg-blue-500 text-white p-1 px-8 rounded shadow-md mt-4 disabled:opacity-50"
              type="submit"
              disabled={userId === null}
            >
              Save
            </button>
          )}
        </div>
      </>
    );
  }

  function RarityRadio({ rarity }: { rarity: string }) {
    return (
      <input
        className={`appearance-none w-10 h-10 rounded-full hover:outline
                  outline-gray-400 cursor-pointer checked:outline checked:outline-gray-500 mx-2`}
        style={{
          backgroundColor:
            rarity === "common" ? "white" : getRarityColor(rarity),
        }}
        type="radio"
        name="rarity"
        value={rarity}
        checked={card.rarity === rarity}
        onChange={handleRarityChange}
      />
    );
  }
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
      <div className="w-full max-w-[300px] flex flex-col items-center">
        <label
          className="font-bold text-center text-2xl absolute 
        top-0 -translate-y-2/3 bg-gray-300 px-2 text-gray-500 self-start"
          htmlFor={inputId}
        >
          {name}
        </label>
        {children}
      </div>
    </div>
  );
}

function Font({
  title,
  name,
  settings,
  setSettings,
}: {
  title: string;
  name: string;
  settings: any;
  setSettings: any;
}) {
  const fonts: { title: string; className: string }[] = [
    { title: "Lato", className: lato.className },
    { title: "Comic Neue", className: comicNeue.className },
    { title: "Baskervville", className: baskervville.className },
    { title: "Pacifico", className: pacifico.className },
    { title: "Lobster", className: lobster.className },
    { title: "Rowdies", className: rowdies.className },
    {
      title: "Permanent Marker",
      className: permanentMarker.className,
    },
  ];

  const [selectedFont, setSelectedFont] = useState(
    settings?.[name] || fonts[0]?.title || "Lato"
  );

  useEffect(() => {
    setSelectedFont(settings?.[name] || fonts[0]?.title || "Lato");
  }, [settings, fonts]);

  function handleFontChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newFont = e.target.value;
    setSelectedFont(newFont);
    setSettings((prev: any) => ({ ...prev, [name]: newFont }));
  }

  return (
    <div className="flex grow flex-col items-center">
      <label className={`font-bold w-full`} htmlFor={name}>
        {title}:
      </label>
      <select
        className={`rounded m-1 p-1 text-center w-full h-8 ${getFontClass(
          selectedFont
        )}`}
        name={name}
        id={name}
        value={selectedFont}
        onChange={handleFontChange}
      >
        {fonts.map((font) => (
          <option
            key={font.title}
            className={font.className}
            value={font.title}
          >
            {font.title}
          </option>
        ))}
      </select>
    </div>
  );
}

function Color({
  name,
  type,
  settings,
  setSettings,
}: {
  name: string;
  type: "background" | "content" | "text";
  settings: any;
  setSettings: any;
}) {
  const [color, setColor] = useState(settings?.color?.[type] || "#000000");

  useEffect(() => {
    setColor(settings?.color?.[type] || "#000000");
  }, [settings, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    setSettings((prev: any) => ({
      ...prev,
      color: { ...prev.color, [type]: newColor },
    }));
  };

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <label className="font-bold w-full" htmlFor={`color-${type}`}>
        {name}:
      </label>
      <input
        className="rounded m-1 w-4/5 text-center custom-color"
        type="color"
        id={`color-${type}`}
        name={`color-${type}`}
        value={color}
        onChange={handleChange}
      />
    </div>
  );
}
