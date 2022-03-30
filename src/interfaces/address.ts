export type AddressFieldType = {
  name: string;
  placeholder: string;
  required: boolean;
  value: string;
  order?: number;
  defaultValue?: string;
};

export type CountryType = {
  country_id: string;
  iso_code_2: string;
  iso_code_3: string;
  phonecode: string;
  postcode_required: string;
  main_name: string;
  name: string;
};

export interface IAddress {
  address_id: string;
  firstname: string;
  lastname: string;
  company: string;
  company_id: string;
  tax_id: string;
  address_1: string;
  address_2: string;
  postcode: string;
  telephone: string;
  city: string;
  zone_id: string;
  zone: string;
  zone_code: string;
  area_id: string;
  area: string;
  area_code: string;
  country_id: string;
  country: string;
  iso_code_2: string;
  iso_code_3: string;
  address_format: string;
  default: string;
}
