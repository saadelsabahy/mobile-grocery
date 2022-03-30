export interface FilterSelectedItemes {
  [number: string]: string;
}
export interface CategoryChildren {
  category_id?: string;
  name?: string;
  image?: string;
  sister_id?: string;
  manufacturer?: [];
  href?: string;
}
export interface categoriesInterface {
  category_id?: string;
  name?: string;
  description?: string;
  image?: string;
  children?: CategoryChildren[];
  storecode?: string;
  manufacturer?: [];
  href?: string;
}
