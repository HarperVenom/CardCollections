export type CardType = {
  id: string;
  title?: string;
  image?: string;
  description?: string;
  attributes?: string;
  category?: string;
  font1?: string;
  font2?: string;
  colorBackground?: string;
  colorContent?: string;
  colorText?: string;
  rarity: string;
};

export type ConvertedCardType = {
  id: string;
  title?: {
    value: string;
    style?: string[];
  };
  image?: {
    url: string;
    style?: string[];
  };
  description?: {
    value: string;
    style?: string;
  };
  attributes?: {
    [key: string]: string;
  };
  category?: {
    value: string;
    style?: string;
  };
  settings?: CardSettings;
  rarity: string;
};

export type CardSettings = {
  font1?: string;
  font2?: string;
  color?: {
    background?: string;
    content?: string;
    text?: string;
  };
};

export type FieldsTemplate = {
  fields: {
    [key: string]: string;
  };
};

export type Attributes = {
  [key: string]: string;
};

export interface FormEntry {
  id: number;
  key: string;
  value: string;
}
