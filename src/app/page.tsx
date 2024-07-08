import CardsList from "@/components/card-list";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="font-bold text-lg">Welcome to story builder!</h1>
      <Link href={"/edit-card"}>Create Character</Link>
      <CardsList />
    </main>
  );
}
