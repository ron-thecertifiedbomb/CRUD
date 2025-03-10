export interface User {
    name: string;
    address: string;

}

export interface UserNew extends User {
  email: string;
} 




export type UserType = {
    name: string;
    address: string;
    email: string;

}


export type ProductType = {
    productName: string;
    category: string;
    price: number | string;
    stocks: number | string
}