export interface Product {
  title: string;
  title_pt: string;
  price: {
    current: number;
    discount: number;
  };
  storage_count: string;
  storage_info: string;
  descriptions: string;
  descriptions_pt: string;
  category: any;
  images: Array<string>;
  life_conditions: string;
  life_conditions_pt: string;
  sub_category: any;
  сomposition: string;
  сomposition_pt: string;
}

export interface Promocode {
  code: string;
  discount: number;
}
