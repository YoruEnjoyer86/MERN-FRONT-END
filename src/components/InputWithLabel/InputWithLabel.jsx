import React, { useContext, useEffect, useState } from "react";
import "./InputWithLabel.css";
import { AddProductToDatabaseContext } from "../../Contexts/AddProductToDatabaseContext";
import axios from "axios";
import base_url from "../../base_url";

// const favorites_image = (
//   await axios.post(base_url + "/get_image", {
//     img_name: "favorites.png",
//   })
// ).data.img;

// const circle_image = (
//   await axios.post(base_url + "/get_image", {
//     img_name: "circle.png",
//   })
// ).data.img;

const OnValueChange = (event, setValue) => {
  setValue(event.target.value);
};

const OnUploadClick = () => {
  document.getElementById("file_input").click();
};

const InputWithLabel = ({
  label,
  value,
  setValue,
  inputType = "text",
  options = [],
  selectId = "",
  uploadedImage,
  setUploadedImage,
  OnValChange,
}) => {
  const { setUploadedImageFile } = useContext(AddProductToDatabaseContext);

  const OnPasteImageFromClipboard = async (event) => {
    let clipboardItems = await navigator.clipboard.read();
    let item = clipboardItems[0];
    for (let type of item.types) {
      let blob = await item.getType(type);
      // console.log("BLOB TYPE : " + blob.type);
      if (blob.type.includes("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImage(reader.result);
        };
        reader.readAsDataURL(blob);
        let imgFile = new File([blob], "img" + "." + blob.type.split("/")[1], {
          type: blob.type,
        });
        setUploadedImageFile(imgFile);
        // console.log("ADDED IMAGE FROM CLIP");
        break;
      }
    }
  };

  const OnFileChange = (event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    // console.log(event.target.files[0]);
    setUploadedImageFile(event.target.files[0]);
    // console.log(event.target.files[0].type);
    //sa testez daca e png
  };

  useEffect(() => {
    // console.log(options);
  }, []);

  return (
    <div className="input_label_row">
      <h1 className="input_label_text">{label}</h1>
      {inputType === "text" ? (
        <input
          className="input_text"
          type="text"
          value={value}
          onChange={() => {
            OnValueChange(event, setValue);
            if (OnValChange != undefined) OnValChange();
          }}
        />
      ) : inputType === "image" ? (
        <div className="input_label_row">
          <img src={uploadedImage} className="uploaded_image" />
          <div className="input_buttons_column">
            <input
              type="file"
              id="file_input"
              onChange={() => {
                OnFileChange(event);
                if (OnValChange != undefined) OnValChange();
              }}
            />
            <div
              className="button_with_image_text margin_down_for_button"
              onClick={OnUploadClick}
            >
              <img className="image_button" src={"favorites_image"} />
              <h3>Upload image</h3>
            </div>
            <div
              className="button_with_image_text"
              onClick={() => {
                OnPasteImageFromClipboard(event);
              }}
            >
              <img className={"circle_image"} />
              <h3>Paste from clipboard</h3>
            </div>
          </div>
        </div>
      ) : (
        <select
          id={selectId}
          className={
            "options_menu_input_label " +
            (options.length == 0 && "disabled_input")
          }
          value={value}
          onChange={(event) => {
            if (OnValChange != undefined) OnValChange();
            setValue(event.target.value);
          }}
          disabled={options.length == 0}
        >
          {options.map((opt, index) => (
            <option key={index} className="input_label_option" value={index}>
              {opt === undefined ? "" : opt.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default InputWithLabel;
