export type LoginDefaultValuesType = {email: string; password: string};
type errorsType = {[key: string]: string};
export interface CustomerType {
  customer_id?: number;
  expand_id?: number;
  store_id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  telephone?: string;
  fax?: string;
  cart?: string;
  wishlist?: string;
  newsletter?: number;
  address_id?: number;
  customer_group_id?: number;
  ip?: number;
  status?: number;
  approved?: number;
  firebase_token?: string | null;
  device_type?: string | null;
  date_added?: string;
  language_id?: string | null;
  dob?: string;
  gender?: string;
  expand_last_update?: string;
  buyer_subscription_id?: string | null;
  addresses?: [];
  name?: string;
}
export interface UpdateCustomerResponseType {
  data: {data: CustomerType; success: boolean; errors: errorsType};
}
export interface ValidateCustomerResponseType {
  data: {
    success: boolean;
    id: string;
    has_verification: boolean;
    verification_provider: string;
    errors: errorsType;
    customer: CustomerType;
  };
}
export interface VerifyCodeResponseType {
  success: boolean;
  customer: any;
  message: string;
  fields: any[];
}
export type AppleJwtDecodedResponse = {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  nonce: string;
  c_hash: string;
  email: string;
  email_verified: boolean;
  auth_time: number;
  nonce_supported: boolean;
};

export type SignInResponseType = {
  success: boolean;
  data: number;
  verification_provider: string;
  message: string;
};
export type OldLoginResponseType = {
  error?: string;
  is_logged: boolean;
  customer?: CustomerType;
};

export type oldSocialLoginBodyDataType = {
  profile: {
    email: string;
    identifier: string;
    lastName?: string;
    firstName?: string;
    photoURL?: string;
    displayName?: string;
  };
  provider: string;
};

export type logoutResponseType = {
  message?: string;
  warning?: string;
};

export type editCustomerResponseType = {
  data: {customer?: CustomerType; error?: string; success?: string};
};
