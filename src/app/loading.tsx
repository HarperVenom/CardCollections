import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className="flex-grow flex justify-center">
      <Spinner size="lg"></Spinner>
    </div>
  );
}
