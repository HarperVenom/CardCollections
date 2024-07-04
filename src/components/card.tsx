import { ConvertedCardType } from "../../types/types";

export default function Card({ data: card }: { data: ConvertedCardType }) {
  return (
    <>
      <div
        className="min-w-[300px] max-w-[300px] min-h-[430px]
        max-h-[430px] bg-white box-s 
      flex flex-col align-middle shadow-md "
      >
        {card.image && (
          <img
            className=" box-border
          min-w-[300px] max-w-[300px] min-h-[215px] max-h-[215px] object-cover"
            src={card.image.url}
            alt=""
          />
        )}
        <div className="p-4">
          {Object.entries(card.fields!).map(([key, value], i) => (
            <div key={i} className="flex">
              <div className="font-bold mr-2">{`${key}: `}</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
