import {
  baskervville,
  comicNeue,
  lato,
  lobster,
  pacifico,
  permanentMarker,
  rowdies,
} from "@/app/ui/fonts";
import { Attributes, FormEntry } from "../../types/cardTypes";

export function getFontClass(font: string): string {
  switch (font) {
    case "Lato":
      return lato.className;
    case "Comic Neue":
      return comicNeue.className;
    case "Baskervville":
      return baskervville.className;
    case "Pacifico":
      return pacifico.className;
    case "Lobster":
      return lobster.className;
    case "Rowdies":
      return rowdies.className;
    case "Permanent Marker":
      return permanentMarker.className;
    default:
      return "";
  }
}

export function getRarityColors(rarity: string): string {
  switch (rarity) {
    case "uncommon":
      return "rgb(34 197 94)";
    case "rare":
      return "rgb(59 130 246)";
    case "epic":
      return "rgb(168 85 247)";
    case "legendary":
      return "rgb(234 179 8)";
    case "mythic":
      return "rgb(220 38 38)";
    case "shadowed":
      return "black";
    default:
      return "";
  }
}

export function AttributesToFormEntries(attributes: Attributes): FormEntry[] {
  const entries = Object.entries(attributes);
  const formFields: FormEntry[] = [];
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const formField: FormEntry = {
      id: i,
      key: key,
      value: value,
    };
    formFields.push(formField);
  }
  return formFields;
}
