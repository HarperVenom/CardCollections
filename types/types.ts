export type CardType = {
  id: string;
  isTemplate: boolean;
  fields: string;
};

export type ConvertedCardType = {
  id: string;
  title?: {
    value: string;
    properties: string[];
  };
  image?: {
    url: string;
    properties?: string[];
  };
  description?: {
    value: string;
    color?: string;
  };
  fields?: {
    [key: string]: string;
  };
  category?: string;
  color?: string;
  font1?: string;
  font2?: string;
  rarity: string;
};

export type FieldsTemplate = {
  fields: {
    [key: string]: string;
  };
};

export type CardFields = {
  [key: string]: string;
};
