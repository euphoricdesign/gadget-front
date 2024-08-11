export interface FormData {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

export interface Errors {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

export interface UserData {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface UserSession {
  token: string;
  userData: UserData;
}

export interface Product {
  name: string;
  price: number;
  image: string;
}

export interface Purchase {
  products: Product[];
  date: string;
  status: string;
}

export interface FormDataLogin {
  email: string;
  password: string;
}

export interface ErrorsLogin {
  email: string;
  password: string;
}

export interface ProductPurchased {
  id: string;
  image: string;
  name: string;
  price: number;
}

export interface Purchased {
  products: ProductPurchased[];
  status: string;
  date: string;
}