import { React, useState } from "react";
import "./add_product_to_database.css";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";

const noImageUploadedImage = "../../public/no_image.png";

const Add_product_to_database = () => {
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
        product: {
          name,
          description,
          quantity,
          seller,
          price,
          category,
          img_src: uploadedImage,
        },
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

  const [profileNotifications, setProfileNotifications] = useState(1);
  const [favoritesNotifications, setFavoritesNotifications] = useState(0);
  const [cartNotifications, setCartNotifications] = useState(0);

  return (
    <div className="add_product_to_database_page">
      <NavBar
        className="no_margin"
        notifications={[
          profileNotifications,
          favoritesNotifications,
          cartNotifications,
        ]}
      />
      <div className="contents">
        <h1>ADD PRODUCT TO DATABASE</h1>
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
    </div>
  );
};

export default Add_product_to_database;
