import {
  Baskervville,
  Comic_Neue,
  Lato,
  Lobster,
  Pacifico,
  Permanent_Marker,
  Rowdies,
  Rubik,
} from "next/font/google";

export const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});
export const baskervville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});

export const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
});
export const rowdies = Rowdies({
  subsets: ["latin"],
  weight: ["400"],
});
