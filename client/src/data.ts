import {  UserType } from "./type";

  export const user: UserType[] = [{
    name: 'Ronan',
    address: 'Ciudad Real',
    email: 'ronan.ramos.sibunga@gmail.com'
  },
  {
    name: 'Michiko',
    address: 'Ciudad Real',
    email: 'ronan.ramos.sibunga@gmail.com'
  },
  ]

  export const products = [{
    productName: 'Nike',
    category: 'shoes',
    price: 400,
    stocks: 15
  },

  {
    productName: 'Adidas',
    category: 'shoes',
    price: 500,
    stocks: 15
  },
  {
    productName: 'Converse',
    category: 'shoes',
    price: 100,
    stocks: 15
  },
  {
    productName: 'DC',
    category: 'shoes',
    price: 50,
    stocks: 15
  },
]

 export const links = products.map((product) => product.productName);