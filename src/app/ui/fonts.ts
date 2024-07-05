import {
  Bebas_Neue,
  Comic_Neue,
  Lato,
  Oswald,
  Permanent_Marker,
  Roboto,
  Roboto_Slab,
  Rubik,
} from "next/font/google";

export const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
export const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
export const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
export const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
export const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});
export const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});
