export type CardType = {
  id: string;
  isTemplate: boolean;
  fields: string;
};

export type ConvertedCardType = {
  id: string;
  isTemplate: boolean;
  fields: {
    [key: string]: string;
  };
};

export type CardFields = {
  [key: string]: string;
};
