export type CardType = {
  id: string;
  authorId: string;
  createdAt: Date;
  title?: string;
  image?: string;
  imageLayout?: ImageLayout;
  description?: string;
  attributes?: string;
  category?: string;
  font1?: string;
  font2?: string;
  borderColor?: string;
  borderRadius?: BorderRadius;
  textureBackground?: string;
  textureContent?: string;
  colorBackground?: string;
  colorContent?: string;
  colorText?: string;
  rarity: string;
  rarityColor: string;
};

export type ConvertedCardType = {
  id: string;
  title?: {
    value: string;
    style?: string[];
  };
  image?: {
    url: string;
    layout?: ImageLayout;
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

export type PublicCardType = {
  id: string;
  authorId: string;
  publishedAt: Date;
  collectionId: string;
};

export type CardSettings = {
  font1?: string;
  font2?: string;
  border?: {
    color?: string;
    radius?: BorderRadius;
  };
  texture?: {
    background?: string;
    content?: string;
  };
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

export type BorderRadius = "round" | "square";
export type ImageLayout = "standart" | "wide" | "full";
