import { Button } from "@/components/button";
import CardsList from "@/components/card-list";
import Link from "next/link";
import { getCards } from "../../../actions/cardActions";

export default async function Workshop() {
  const cards = await getCards();
  return (
    <div className="flex-grow">
      <nav className="">
        <ul className="max-w-[1000px] flex justify-center m-auto">
          <li className="flex">
            <div
              className="
            flex flex-col justify-center text-2xl text-zinc-500 my-8"
            >
              {`${cards.length}/7`}
            </div>
            {cards.length < 7 ? (
              <Link className="my-8 mx-4" href={"/workshop/edit-card"}>
                <Button>Create Card</Button>
              </Link>
            ) : null}
          </li>
        </ul>
      </nav>

      <CardsList cards={cards} />
    </div>
  );
}
