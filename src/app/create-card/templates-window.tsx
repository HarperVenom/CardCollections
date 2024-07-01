"use client";
import { useContext } from "react";
import { ConvertedCardType } from "../../../types/types";
import Card from "../../components/card";
import { FormFieldsContext } from "./context";

export default function TemplateWindow({
  onTemplateChoose,
}: {
  onTemplateChoose: (template: ConvertedCardType) => void;
}) {
  const { templates } = useContext(FormFieldsContext);

  return (
    <div className="absolute flex overflow-auto h-1/2 w-screen top-0 left-0 bg-gray-400">
      {templates.map((template, i) => (
        <div
          key={i}
          className="scale-50 cursor-pointer"
          onClick={() => onTemplateChoose(template)}
        >
          <Card data={template}></Card>
        </div>
      ))}
    </div>
  );
}
