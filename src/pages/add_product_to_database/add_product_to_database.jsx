import { React, useEffect, useState } from "react";
import "./add_product_to_database.css";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import PopupNotification from "../../components/PopupNotification/PopupNotification";
import { AddProductToDatabaseContext } from "../../Contexts/AddProductToDatabaseContext";
import base_url from "../../base_url";

const noImageUploadedImage = "/no_image.png";

const Add_product_to_database = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [megaCategoryIndex, setMegaCategoryIndex] = useState(0);
  const [subCategoryIndex, setSubCategoryIndex] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(noImageUploadedImage);
  const [uploadedImageFile, setUploadedImageFile] = useState(undefined);
  const [proudctAddNotification, setProductAddNotification] = useState(false);
  const [productAddedSuccessfully, setProductAddedSuccessfully] =
    useState(false);
  const [megaCategories, setMegaCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const CheckUserConnected = async () => {
    let token = localStorage.getItem("access_token");
    let res = await axios.get(base_url + "/check_connected", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // console.log("CONNECTED : " + res.data.ok);
    return res.data.ok;
  };

  const FetchCategories = async () => {
    // console.log(megaCategoryIndex);
    let res;
    if (megaCategories.length != 0)
      res = await axios.post(base_url + "/get_categories", {
        mega_category: megaCategories[megaCategoryIndex],
      });
    if (res != undefined) {
      // console.log(res.data.categories);
      setCategories(res.data.categories);
    }
  };

  const FetchSubCategories = async () => {
    let res;
    if (categories.length != 0) {
      res = await axios.post(base_url + "/get_subcategories", {
        category: categories[categoryIndex],
      });
      // console.log(res.data);
    }
    if (res != undefined) setSubcategories(res.data.subcategories);
  };

  const Initialize = async () => {
    if ((await CheckUserConnected()) == false) navigate("/register");
    else {
      let res = await axios.post(base_url + "/get_mega_categories");
      setMegaCategories(res.data.megaCategories);
      let cats = await axios.post(base_url + "/get_categories", {
        mega_category: res.data.megaCategories[0],
      });
      setCategories(cats.data.categories);
      // console.log(cats.data);
      // console.log(res.data.megaCategories);
    }
  };

  useEffect(() => {
    Initialize();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCategoryIndex(0);
    FetchCategories();
  }, [megaCategoryIndex, megaCategories]);

  useEffect(() => {
    setSubCategoryIndex(0);
    FetchSubCategories();
  }, [categories, categoryIndex]);

  const OnAddProduct = async () => {
    if (name == "" || description == "" || quantity == "" || price == "") {
      setProductAddedSuccessfully(false);
      setProductAddNotification(true);
      return;
    }
    let token = localStorage.getItem("access_token");
    let response = await axios.get(base_url + "/check_connected", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    let res = await axios.post(base_url + "/add_product_to_database", {
      name,
      description,
      quantity,
      seller: response.data.user._id,
      price,
      mega_category: megaCategories[megaCategoryIndex],
      category: categories[categoryIndex],
      subcategory: subcategories[subCategoryIndex],
    });
    if (res.status !== 200) {
      console.log(res.data.message);
      return;
    }
    console.log("ADDING PRODUCT TO DATABASE SUCCEDED!");
    let product_id = res.data.product_id;

    let imageToUpload = new File(
      [uploadedImageFile],
      product_id + "." + uploadedImageFile.type.split("/")[1],
      {
        type: uploadedImageFile.type,
      }
    );
    // console.log("NAME: " + imageToUpload.name);
    // console.log("TYPE: " + imageToUpload.type);
    res = await axios.post(
      base_url + "/add_product_image",
      {
        file: imageToUpload,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.status !== 200) {
      console.log(res.data.message);
      setProductAddedSuccessfully(false);
      setProductAddNotification(true);
      res = await axios.post(base_url + "/delete_product_from_database", {
        product_id,
      });
      if (res.status === 200)
        console.log("SUCCESSFULLY REMOVED PRODUCT FROM DATABASE!");
      return;
    }
    setProductAddedSuccessfully(true);
    setProductAddNotification(true);
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
                  src="/x.jpg"
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
          <InputWithLabel label="price" value={price} setValue={setPrice} />
          <InputWithLabel
            label="mega category"
            inputType="choices"
            value={megaCategoryIndex}
            setValue={setMegaCategoryIndex}
            selectId="mega_category_select"
            options={megaCategories}
          />
          <InputWithLabel
            label="category"
            inputType="choices"
            value={categoryIndex}
            setValue={setCategoryIndex}
            options={categories}
          />
          <InputWithLabel
            label="sub category"
            inputType="choices"
            value={subCategoryIndex}
            setValue={setSubCategoryIndex}
            options={subcategories}
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
