import {
  bebasNeue,
  comicNeue,
  lato,
  oswald,
  permanentMarker,
  roboto,
  robotoSlab,
} from "@/app/ui/fonts";
import { Attributes, FormEntry } from "../../types/cardTypes";

export function getFontClass(font: string): string {
  switch (font) {
    case "Lato":
      return lato.className;
    case "Roboto":
      return roboto.className;
    case "Comic Neue":
      return comicNeue.className;
    case "Roboto Slab":
      return robotoSlab.className;
    case "Bebas Neue":
      return bebasNeue.className;
    case "Oswald":
      return oswald.className;
    case "Permanent Marker":
      return permanentMarker.className;
    default:
      return "";
  }
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case "rare":
      return "rgb(34 197 94)";
    case "epic":
      return "rgb(168 85 247)";
    case "legendary":
      return "rgb(234 179 8)";
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
