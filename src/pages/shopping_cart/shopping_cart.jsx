import { React, useState } from "react";
import "./shopping_cart.css";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import axios from "axios";

const noImageUploadedImage = "../../public/no_image.png";

const shopping_cart = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [seller, setSeller] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [uploadedImage, setUploadedImage] = useState(noImageUploadedImage);

  const OnAddProduct = async () => {
    axios
      .post("http://localhost:3001/api/add_product", {
        product: JSON.stringify({
          name,
          description,
          quantity,
          seller,
          price,
          category,
          img_src: uploadedImage,
        }),
      })
      .then((err, res) => {
        if (!err) {
          setName("");
          setDescription("");
          setQuantity("");
          setSeller("");
          setPrice("");
          setCategory("");
          setUploadedImage(noImageUploadedImage);
          alert(res.data);
          console.log(res.data);
        }
      });
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
      <InputWithLabel label="price" value={price} setValue={setPrice} />
      <InputWithLabel
        label="category"
        value={category}
        setValue={setCategory}
      />
      <InputWithLabel
        label="image"
        inputType="image"
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
      />
      <button className="add_product_button" onClick={OnAddProduct}>
        ADD PRODUCT
      </button>
    </div>
  );
};

export default shopping_cart;
