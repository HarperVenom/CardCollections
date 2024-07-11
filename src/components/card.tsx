import { getFontClass, getRarityColor } from "@/utils/utils";
import { ConvertedCardType } from "../../types/cardTypes";

export default function Card({
  data: card,
  width,
}: {
  data: ConvertedCardType;
  width?: number;
}) {
  const initialWidth = 300;
  const initialHeight = 430;

  function getScale(): number {
    if (!width) return 1;
    const ratio = width / initialWidth;
    return ratio;
  }

  return (
    <div
      style={{
        minWidth: initialWidth * getScale() + "px",
        width: initialWidth * getScale() + "px",
        maxWidth: initialWidth * getScale() + "px",
        minHeight: initialHeight * getScale() + "px",
        height: initialHeight * getScale() + "px",
        maxHeight: initialHeight * getScale() + "px",
      }}
    >
      <div
        className={`min-w-[300px] w-[300px] max-w-[300px] 
        min-h-[430px] h-[430px]
        max-h-[430px] relative origin-top-left`}
        style={{ transform: `scale(${getScale()}, ${getScale()})` }}
      >
        <div
          className={`absolute w-full h-full 
      scale-105 -z-10 blur-md opacity-80 brightness-150`}
          style={{ backgroundColor: getRarityColor(card.rarity) }}
        ></div>
        <div className=""></div>
        <div
          className={`w-full h-full bg-white rounded-xl 
      flex flex-col shadow-md justify-evenly overflow-hidden`}
          style={{
            backgroundColor: card.settings?.color?.background || "white",
            color: card.settings?.color?.text || "black",
          }}
        >
          {card.image && (
            <div
              className={`p-4 box-border min-w-[300px] max-w-[300px] 
          min-h-[250px] max-h-[250px] flex relative`}
            >
              <img
                className="min-h-full w-full
              object-cover rounded "
                src={card.image.url}
                alt=""
              />
              {card.title && card.title.value && (
                <h1
                  className={`
            text-center min-w-52 w-max max-w-[250px] max-h-12 text-lg
          bg-gray-200 py-1 px-4 rounded-full 
            overflow-hidden absolute bottom-1 left-1/2 -translate-x-1/2
            font-bold ${getFontClass(card.settings?.font1!)}
            `}
                  style={{
                    backgroundColor: card.settings?.color?.content,
                  }}
                >
                  {card.title.value}
                </h1>
              )}
            </div>
          )}
          {!card.image && card.title && card.title.value && (
            <div
              className={`text-center min-w-36 max-w-[200px] max-h-16 mx-auto text-lg
          bg-gray-200 py-1 px-4 rounded-full -mt-10
          overflow-hidden font-bold ${getFontClass(card.settings?.font1!)}`}
              style={{
                backgroundColor: card.settings?.color?.content,
              }}
            >
              {card.title.value}
            </div>
          )}
          {card.description && card.description.value && (
            <div
              className="w-full max-h-[10rem] flex justify-center 
            items-center overflow-hidden
            my-1"
            >
              <p
                className={`bg-gray-200 w-[80%] min-h-24 max-h-full 
            px-4 py-2 box-border text-center rounded-xl text-sm flex justify-center
            items-center font-semibold ${getFontClass(card.settings?.font2!)}`}
                style={{
                  backgroundColor: card.settings?.color?.content,
                }}
              >
                {card.description.value}
              </p>
            </div>
          )}
          {card.attributes && Object.entries(card.attributes).length > 0 && (
            <div
              className={`w-full h-max flex justify-center 
            items-center overflow-hidden
            my-1 ${getFontClass(card.settings?.font2!)}`}
            >
              <div
                className={`bg-gray-200 w-[90%] max-h-full 
            p-2 box-border rounded-xl text-xs grid ${
              Object.entries(card.attributes).length > 1 && "grid-cols-2"
            }`}
                style={{
                  backgroundColor: card.settings?.color?.content,
                }}
              >
                {Object.entries(card.attributes).map(([key, value], i) => (
                  <div
                    key={i}
                    className="flex justify-center whitespace-nowrap grid-"
                  >
                    <div className="font-bold mr-1">{`${key}: `}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {card.category && card.category.value && (
            <h2
              className={`text-center max-h-16 text-base
          bg-gray-200 py-1 px-8 mt-1
          overflow-hidden italic ${getFontClass(card.settings?.font1!)}`}
              style={{
                backgroundColor: card.settings?.color?.content,
              }}
            >
              {card.category.value}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
