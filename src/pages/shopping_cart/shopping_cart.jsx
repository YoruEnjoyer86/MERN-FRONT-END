import { React, useState } from "react";
import "./shopping_cart.css";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import axios from "axios";

const shopping_cart = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [seller, setSeller] = useState("");

  const OnAddProduct = async () => {
    axios
      .post("http://localhost:3001/api/add_product", {
        product: JSON.stringify({
          name,
          description,
          quantity,
          seller,
        }),
      })
      .then((res) => {
        alert(res.body);
        console.log(res);
      });
    setName("");
    setDescription("");
    setQuantity("");
    setSeller("");
  };

  return (
    <div className="pagina">
      <h1>ADAUGA PRODUS IN BAZA DE DATE</h1>
      <InputWithLabel label="name" value={name} setValue={setName} />
      <InputWithLabel
        label="description"
        value={description}
        setValue={setDescription}
      />
      <InputWithLabel
        label="quantity"
        value={quantity}
        setValue={setQuantity}
      />
      <InputWithLabel label="seller" value={seller} setValue={setSeller} />
      <button className="add_product_button" onClick={OnAddProduct}>
        ADD PRODUCT
      </button>
    </div>
  );
};

export default shopping_cart;
