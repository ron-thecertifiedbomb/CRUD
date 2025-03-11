export interface User {
    id: number 
    name: string 
    email: string 
    age: number | string 
}




export type UserPayload = {
    name: string;
    email: string;
   age: number | string

}


export type ProductType = {
    productName: string;
    category: string;
    price: number | string;
    stocks: number | string
}