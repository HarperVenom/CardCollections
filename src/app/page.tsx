import CharactersList from "@/components/characters-list";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="font-bold text-lg">Welcome to story builder!</h1>
      <Link href={"/create-character"}>Create Character</Link>
      <CharactersList />
    </main>
  );
}
