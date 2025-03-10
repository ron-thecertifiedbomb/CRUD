import React, { useState } from "react";
import { ProductType } from "./type";


interface ProductList {
  items: ProductType[];
}

const ItemList: React.FC<ProductList> = ({ items }) => {
  //   const itemLists = items.map((item) => console.log(item));

  const [inputValue, setInputValue] = useState("");

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const doublePrice = items.find((item) => item.price < 100);

  const filterProducts = items.filter((item) => item.productName === "Nike");

  const [count, setCount] = useState<number>(1);
  const [fruits, setFruits] = useState<string[]>(["Apple", "Banana", "Grapes"]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const addFruits = (fruit: string) => {
    const updatedFruits = [...fruits];
    updatedFruits.push(fruit);
    setFruits(updatedFruits);
  };

  const addFruitsMethodTwo = (fruit: string) => {
    setFruits((prevFruits) => [fruit, ...prevFruits]);
  };

  return (
    <>
      
      <input
        name="inputField"
        value={inputValue}
        placeholder="name"
        onChange={(e) => handleChange(e.target.value)}
      />
      <div>{count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={() => addFruits("Durian")}>Add Durian</button>
      <button onClick={() => addFruitsMethodTwo("Durian")}>Add Method 2</button>
    </>
  );
};

export default ItemList;
