import { React, useEffect, useState } from "react";
import "./add_product_to_database.css";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import PopupNotification from "../../components/PopupNotification/PopupNotification";
import { AddProductToDatabaseContext } from "../../Contexts/AddProductToDatabaseContext";

const noImageUploadedImage = "../../public/no_image.png";

const Add_product_to_database = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [seller, setSeller] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [uploadedImage, setUploadedImage] = useState(noImageUploadedImage);
  const [uploadedImageFile, setUploadedImageFile] = useState(undefined);
  const [proudctAddNotification, setProductAddNotification] = useState(false);
  const [productAddedSuccessfully, setProductAddedSuccessfully] =
    useState(false);

  const CheckUserConnected = async () => {
    let res = await axios.get("http://localhost:3001/check_connected");
    console.log("CONNECTED : " + res.data.ok);
    return res.data.ok;
  };

  const Initialize = async () => {
    if ((await CheckUserConnected()) == false) navigate("/register");
  };

  useEffect(() => {
    Initialize();
  }, []);

  const OnAddProduct = async () => {
    if (
      name == "" ||
      description == "" ||
      quantity == "" ||
      seller == "" ||
      price == "" ||
      category == "" ||
      uploadedImage == noImageUploadedImage
    ) {
      setProductAddedSuccessfully(false);
      setProductAddNotification(true);
      return;
    }

    let imageToUpload = new File(
      [uploadedImageFile],
      name + "_" + seller + "." + uploadedImageFile.type.split("/")[1],
      {
        type: uploadedImageFile.type,
      }
    );
    console.log("NAME: " + imageToUpload.name);
    console.log("TYPE: " + imageToUpload.type);
    axios
      .post(
        "http://localhost:3001/api/add_product",
        {
          name,
          description,
          quantity,
          seller,
          price,
          category,
          file: imageToUpload,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.data.ok) {
          // setName("");
          // setDescription("");
          // setQuantity("");
          // setSeller("");
          // setPrice("");
          // setCategory("");
          // setUploadedImage(noImageUploadedImage);
          setProductAddedSuccessfully(true);
          setProductAddNotification(true);
        } else {
          setProductAddedSuccessfully(false);
          setProductAddNotification(true);
          // console.log("CE??");
        }
      });
    setUploadedImageFile(imageToUpload);
  };

  const [profileNotifications, setProfileNotifications] = useState(1);
  const [favoritesNotifications, setFavoritesNotifications] = useState(0);
  const [cartNotifications, setCartNotifications] = useState(0);

  let lastTimeOut = undefined;

  return (
    <AddProductToDatabaseContext.Provider
      value={{ uploadedImageFile, setUploadedImageFile }}
    >
      {" "}
      <div className="add_product_to_database_page">
        <NavBar />
        <div className="contents">
          {proudctAddNotification && (
            <PopupNotification
              isVisible={proudctAddNotification}
              setVisible={setProductAddNotification}
              secondsVisible={3}
              lastTimeOut={lastTimeOut}
            >
              <div
                className={
                  productAddedSuccessfully
                    ? "product_added_success_notification"
                    : "product_addded_fail_notification"
                }
              >
                <p className="product_addition_notification_text">
                  {productAddedSuccessfully
                    ? "Product added successfuly!"
                    : "All fields must have a value!"}
                </p>
                <img
                  onClick={() => {
                    setProductAddNotification(false);
                  }}
                  className="x_icon_add_product_notification"
                  src="../../public/x.jpg"
                />
              </div>
            </PopupNotification>
          )}
          <h1 className="title_add_product_page">ADD PRODUCT TO DATABASE</h1>
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
    </AddProductToDatabaseContext.Provider>
  );
};

export default Add_product_to_database;
