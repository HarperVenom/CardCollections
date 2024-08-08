import {
  baskervville,
  comicNeue,
  lato,
  lobster,
  pacifico,
  permanentMarker,
  rowdies,
} from "@/app/ui/fonts";
import {
  Attributes,
  CardType,
  ConvertedCardType,
  FormEntry,
} from "../../types/cardTypes";

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

export function convertCard(card: CardType): ConvertedCardType {
  return {
    id: card.id,
    title: {
      value: card.title!,
    },
    image: {
      url: card.image!,
      layout: card.imageLayout,
    },
    description: {
      value: card.description!,
    },
    attributes: card.attributes && JSON.parse(card.attributes),
    category: {
      value: card.category!,
    },
    settings: {
      font1: card.font1,
      font2: card.font2,
      border: {
        color: card.borderColor,
        radius: card.borderRadius,
      },
      texture: {
        background: card.textureBackground,
        content: card.textureContent,
      },
      color: {
        background: card.colorBackground,
        content: card.colorContent,
        text: card.colorText,
      },
    },
    rarity: card.rarity,
  };
}
