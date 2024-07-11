import CardsList from "@/components/card-list";
import Link from "next/link";

export default function Workshop() {
  return (
    <div className="flex-grow">
      <nav className=" bg-gray-300">
        <ul className="max-w-[1000px] flex justify-end m-auto">
          <li className="flex">
            <Link
              className="py-2 px-4 bg-blue-500 rounded text-white my-4 mx-8"
              href={"/workshop/edit-card"}
            >
              Create Card
            </Link>
          </li>
        </ul>
      </nav>

      <CardsList />
    </div>
  );
}
