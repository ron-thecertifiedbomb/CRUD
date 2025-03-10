import React, { useState, useRef, useEffect } from "react";
import { products } from "./data";
import { ProductType } from "./type";

const AddUser: React.FC = () => {
  
  const [inputName, setInputName] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [inputPrice, setInputPrice] = useState<number | "">("");
  const [inputStocks, setInputStocks] = useState<number | "">("");
  const [productlist, setProducts] = useState<ProductType[]>(products);

  const cheapProducts = productlist.filter((product) => {
    const price = Number(product.price);
    return price > 100 && price < 500;
  });

  console.log("Cheap", cheapProducts);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => focusInput(), []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest("input")
    ) {
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleNameChange = (value: string) => {
    setInputName(value);
  };

  const handleCategoryChange = (value: string) => {
    setInputCategory(value);
  };

  const handlePriceChange = (value: string) => {
    const numericValue = Number(value);
    if (value === "") {
      setInputPrice("");
    } else if (!isNaN(numericValue) && numericValue >= 0) {
      setInputPrice(numericValue);
    }
  };

  const handleStockChange = (value: string) => {
    const numericValue = Number(value);
    console.log("Variable type", typeof numericValue);
    if (value === "") {
      setInputStocks("");
    } else if (!isNaN(numericValue) && numericValue >= 0) {
      setInputStocks(numericValue);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payLoad: ProductType = {
      productName: inputName,
      category: inputCategory,
      price: inputPrice,
      stocks: inputStocks,
    };

    const fields: Record<string, string | number> = {
      ProductName: payLoad.productName,
      Category: payLoad.category,
      Price: payLoad.price,
      Stocks: payLoad.stocks,
    };

    const missingFields: string[] = [];

    Object.entries(fields).forEach(([key, value]) => {
      if (!value) missingFields.push(key);
    });

    if (missingFields.length > 0) {
      console.log(
        "Please fill in the following fields:",
        missingFields.join(", ")
      );
      return;
    }
    setProducts((prevProducts) => [payLoad, ...prevProducts]);
    setInputName("");
    setInputPrice("");
    setInputCategory("");
    setInputStocks("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "200px",
        }}
      >
        <input
          name="name"
          value={inputName}
          ref={inputRef}
          placeholder="product"
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <input
          name="category"
          value={inputCategory}
          placeholder="category"
          onChange={(e) => handleCategoryChange(e.target.value)}
        />
        <input
          name="price"
          value={inputPrice}
          placeholder="price"
          onChange={(e) => handlePriceChange(e.target.value)}
        />
        <input
          name="stocks"
          value={inputStocks}
          placeholder="stocks"
          onChange={(e) => handleStockChange(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
    </>
  );
};

export default AddUser;
