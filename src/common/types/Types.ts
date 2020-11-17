export interface Product {
  title: string;
  price: {
    current: number;
    discount: number;
  };
  descriptions: string;
  category: any;
  images: Array<string>;
  life_conditions: string;
  sub_category: any;
  сomposition: string;
}

export interface Promocode {
  code: string;
  discount: number;
}
