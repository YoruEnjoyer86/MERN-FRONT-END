import React, { useState } from "react";
import "./InputWithLabel.css";

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
  uploadedImage,
  setUploadedImage,
}) => {
  const OnPasteImageFromClipboard = async (event) => {
    let clipboardItems = await navigator.clipboard.read();
    let item = clipboardItems[0];
    let type;
    for (let type of item.types) {
      let blob = await item.getType(type);
      if (blob.type.includes("image/")) {
        //console.log("CONTINE IMAGINE!");
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImage(reader.result);
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  const OnFileChange = (event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    //sa testez daca e png
  };

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
          }}
        />
      ) : (
        <div className="input_label_row">
          <img src={uploadedImage} className="uploaded_image" />
          <div className="input_buttons_column">
            <input
              type="file"
              id="file_input"
              onChange={() => {
                OnFileChange(event);
              }}
            />
            <div
              className="button_with_image_text margin_down_for_button"
              onClick={OnUploadClick}
            >
              <img
                className="image_button"
                src="../../../public/favorites.png"
              />
              <h3>Upload image</h3>
            </div>
            <div
              className="button_with_image_text"
              onClick={() => {
                OnPasteImageFromClipboard(event);
              }}
            >
              <img className="image_button" src="../../../public/circle.png" />
              <h3>Paste from clipboard</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputWithLabel;
