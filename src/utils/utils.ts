import {
  bebasNeue,
  comicNeue,
  lato,
  oswald,
  permanentMarker,
  roboto,
  robotoSlab,
} from "@/app/ui/fonts";

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
      return "green-500";
    case "epic":
      return "purple-500";
    case "legendary":
      return "yellow-500";
    default:
      return "";
  }
}
