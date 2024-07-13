import { Button } from "@/components/button";
import CardsList from "@/components/card-list";
import Link from "next/link";

export default function Workshop() {
  return (
    <div className="flex-grow">
      <nav className="">
        <ul className="max-w-[1000px] flex justify-center m-auto">
          <li className="flex">
            <Link className="m-8" href={"/workshop/edit-card"}>
              <Button>Create Card</Button>
            </Link>
          </li>
        </ul>
      </nav>

      <CardsList />
    </div>
  );
}
