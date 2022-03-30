export type Product = {
  product_id: string;
  name: string;
  short_description?: string;
  float_price: number;
  float_special: number | false;
  price: string;
  special: string | false;
  currency?: string;
  images: Array<string>;
  description: string;
  fixed_description: string;
  rating: string;
  product_code?: string;
  brand?: string;
  availability?: string;
  image: string;
  product_images: ProductImage[];
  product_options?: ProductOption[];
  related_product?: Array<Product>;
  share_links?: string;
  quantity: number;
  attributes?: ProductAttribute[];
  seller_id?: string;
  thumb?: string;
  tax_class_id?: string;
  stock_status?: string;
  reward?: number;
  reviews?: number;
  saving: number;
  unlimited: number;
};

export interface ProductAttribute {
  name?: string;
  text?: string;
}

export interface ProductOption {
  product_option_id: string;
  product_option_value: string;
  option_id: string;
  name: string;
  type: string;
  option_value: OptionValue[];
  required: string;
}

export interface OptionValue {
  product_option_value_id: string;
  option_value_id: string;
  name: string;
  image_thumb: string;
  image: string;
  price: string | boolean;
  float_price: string | boolean;
  currency: string;
  price_prefix: string;
}

export interface ProductImage {
  url: string;
}

export type CartItemOption = {
  name: string;
  value: string;
  type: string;
  product_option_value_id: string;
  product_option_id: string;
};

export type CartItem = {
  key: number;
  product_id: string;
  name: string;
  model: string;
  option: CartItemOption[] | [];
  quantity: number;
  stock: boolean;
  shipping: string;
  price: string;
  float_price: number;
  currency: string;
  total: string;
  float_total: number;
  reward: number;
  image: string;
  available_quantity?: number;
  unlimited: number;
};
export type CartItemTotals = {
  title: string;
  text: string;
};
export enum ChangeAmountEnum {
  INCREASE,
  DECREASE,
}

export type MyordersItemType = {
  product_id: string;
  name: string;
  model: string;
  image: string;
  manufacturer: string | null;
  option: [];
  quantity: number;
  currency: string;
  price: string;
  total: string;
  return: string;
};

export interface OrderType {
  order_id: string;
  name: string;
  status: string;
  order_status_id: number;
  date_added: string;
  products: number;
  products_data: number;
  total: string;
  products_ids: number[];
}
export interface OrderTotalsObjectType {
  order_total_id: number;
  order_id: number;
  code: string;
  title: string;
  text: string;
  value: number;
  sort_order: number;
}
export interface OrderDetailsType {
  invoice_no: string;
  order_id: string;
  date_added: string;
  payment_address: string;
  payment_method: string;
  shipping_address: string;
  shipping_method: string;
  vouchers: [];
  comment: string;
  track_url: string;
  products: MyordersItemType[];
  histories: [{date_added: string; status: string; comment: string}];
  totals: OrderTotalsObjectType[];
}

export interface OnOPtionPressedParameter {
  item: string;
  title: string;
  type: string;
  prefix: string;
  price: string;
}
