import { getFontClass, getRarityColors } from "@/utils/utils";
import { ConvertedCardType } from "../../types/cardTypes";
import { forwardRef, MutableRefObject, RefObject } from "react";

type CardProps = {
  data: ConvertedCardType;
  width?: number;
};

export default function Card({ data: card, width }: CardProps) {
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
        max-h-[430px] relative origin-top-left select-none`}
        style={{ transform: `scale(${getScale()}, ${getScale()})` }}
      >
        <div
          className={`absolute w-full h-full 
      scale-105 -z-10 blur-md opacity-80 brightness-150`}
          style={{ backgroundColor: getRarityColors(card.rarity) }}
        ></div>
        <div
          className={`w-full h-full bg-white rounded-xl 
      flex flex-col shadow-md overflow-hidden relative`}
          style={{
            backgroundColor: card.settings?.color?.background || "white",
            color: card.settings?.color?.text || "black",
            justifyContent:
              card.image?.layout === "full" ? "end" : "space-evenly",
          }}
        >
          {/* BACKGROUND TEXTURE */}
          {card.settings?.texture?.background ? (
            <div className="z-[0] absolute top-0 left-0 w-full h-full">
              <img
                className="w-full h-full object-cover grayscale"
                src={card.settings?.texture?.background}
                alt=""
              />
              <div
                className="z-[2] absolute w-full h-full top-0 mix-blend-color"
                style={{ backgroundColor: card.settings.color?.background }}
              ></div>
            </div>
          ) : null}
          {/* IMAGE */}
          {card.image && card.image.url && (
            <div
              className={`box-border min-w-[300px] max-w-[300px] flex relative`}
              style={{
                position:
                  card.image.layout === "full" ? "absolute" : "relative",
                padding: (() => {
                  switch (card.image.layout) {
                    case "wide":
                      return "0 0 16px 0";
                    case "full":
                      return "0";
                    default:
                      return "16px";
                  }
                })(),
                height: (() => {
                  switch (card.image.layout) {
                    case "wide":
                      return "200px";
                    case "full":
                      return "100%";
                    default:
                      return "250px";
                  }
                })(),
                marginTop: card.image.layout === "wide" ? "0" : "",
              }}
            >
              <img
                className="min-h-full w-full
              object-cover rounded"
                style={{
                  borderRadius:
                    card.image.layout === "wide" || card.image.layout === "full"
                      ? 0
                      : "0.25rem",
                }}
                src={card.image.url}
                alt=""
              />
              {/* TITLE */}
              {card.title && card.title.value && (
                <h1
                  className={`
            text-center min-w-52 w-max max-w-[250px] max-h-12 text-lg
          bg-gray-200 py-1 px-4 rounded-full 
            overflow-hidden absolute left-1/2 -translate-x-1/2
            font-bold ${getFontClass(card.settings?.font1!)}
            `}
                  style={{
                    backgroundColor: card.settings?.color?.content,
                    top: card.image.layout === "full" ? "4px" : "unset",
                    bottom: card.image.layout === "full" ? "unset" : "4px",
                  }}
                >
                  {card.settings?.texture?.content && (
                    <div className="z-[-1] absolute top-0 left-0 w-full h-full">
                      <img
                        className="absolute top-0 left-0 w-full h-full z-[-1] object-cover"
                        src={card.settings?.texture?.content}
                        alt=""
                      />
                      <div
                        className="z-[2] absolute w-full h-full top-0 mix-blend-color"
                        style={{
                          backgroundColor: card.settings.color?.content,
                        }}
                      ></div>
                    </div>
                  )}

                  {card.title.value}
                </h1>
              )}
            </div>
          )}
          {/* TITLE WITHOUT IMAGE */}
          {!card.image?.url && card.title && card.title.value && (
            <div
              className={`z-10 text-center min-w-36 max-w-[200px] max-h-16 mx-auto text-lg
          bg-gray-200 py-1 px-4 rounded-full relative 
          overflow-hidden font-bold ${getFontClass(card.settings?.font1!)}`}
              style={{
                backgroundColor: card.settings?.color?.content,
              }}
            >
              {card.settings?.texture?.content && (
                <div className="z-[-1] absolute top-0 left-0 w-full h-full">
                  <img
                    className="absolute top-0 left-0 w-full h-full z-[-1] object-cover"
                    src={card.settings?.texture?.content}
                    alt=""
                  />
                  <div
                    className="z-[2] absolute w-full h-full top-0 mix-blend-color"
                    style={{
                      backgroundColor: card.settings.color?.content,
                    }}
                  ></div>
                </div>
              )}
              {card.title.value}
            </div>
          )}
          {/* DESCRIPTION */}
          {card.description && card.description.value && (
            <div
              className="w-full grow max-h-[10rem] flex justify-center 
            items-center overflow-hidden relative
            pb-1 z-10"
            >
              <p
                className={`bg-gray-200 w-[80%] h-full max-h-full 
            px-4 py-2 box-border text-center rounded-xl text-sm flex justify-center
            items-center font-semibold overflow-hidden relative ${getFontClass(
              card.settings?.font2!
            )}`}
                style={{
                  backgroundColor: card.settings?.color?.content,
                }}
              >
                {card.settings?.texture?.content && (
                  <div className="z-[0] absolute top-0 left-0 w-full h-full">
                    <img
                      className="absolute top-0 left-0 w-full h-full z-[-1] object-cover"
                      src={card.settings?.texture?.content}
                      alt=""
                    />
                    <div
                      className="z-[2] absolute w-full h-full top-0 mix-blend-color"
                      style={{
                        backgroundColor: card.settings.color?.content,
                      }}
                    ></div>
                  </div>
                )}
                <p className="z-[1]">{card.description.value}</p>
              </p>
            </div>
          )}
          {/* ATTRIBUTES */}
          {card.attributes && Object.entries(card.attributes).length > 0 && (
            <div
              className={`w-full h-max flex justify-center 
            items-center overflow-hidden
            my-1 ${getFontClass(card.settings?.font2!)} z-10`}
            >
              <div
                className={`bg-gray-200 w-[90%] max-h-full 
            p-2 box-border rounded-xl text-xs grid relative overflow-hidden ${
              Object.entries(card.attributes).length > 1 && "grid-cols-2"
            }`}
                style={{
                  backgroundColor: card.settings?.color?.content,
                }}
              >
                {card.settings?.texture?.content && (
                  <div className="z-[0] absolute top-0 left-0 w-full h-full">
                    <img
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      src={card.settings?.texture?.content}
                      alt=""
                    />
                    <div
                      className="z-[2] absolute w-full h-full top-0 mix-blend-color"
                      style={{
                        backgroundColor: card.settings.color?.content,
                      }}
                    ></div>
                  </div>
                )}
                <div className="z-[1]">
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
            </div>
          )}
          {/* CATEGORY */}
          {card.category && card.category.value && (
            <h2
              className={`z-10 text-center max-h-16 text-base
          bg-gray-200 py-1 px-8 mt-1
          overflow-hidden italic relative ${getFontClass(
            card.settings?.font1!
          )}`}
              style={{
                backgroundColor: card.settings?.color?.content,
              }}
            >
              {card.settings?.texture?.content && (
                <div className="z-[-1] absolute top-0 left-0 w-full h-full">
                  <img
                    className="absolute top-0 left-0 w-full h-full z-[-1] object-cover"
                    src={card.settings?.texture?.content}
                    alt=""
                  />
                  <div
                    className="z-[2] absolute w-full h-full top-0 mix-blend-color"
                    style={{
                      backgroundColor: card.settings.color?.content,
                    }}
                  ></div>
                </div>
              )}
              <div className="z-[1]">{card.category.value}</div>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
