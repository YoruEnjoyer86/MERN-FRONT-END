import React from "react";
import "./InputWithLabel.css";

const OnValueChange = (event, setValue) => {
  setValue(event.target.value);
};

const InputWithLabel = ({ label, value, setValue }) => {
  return (
    <div className="input_label_row">
      <h1 className="input_label_text">{label}</h1>
      <input
        className="input_text"
        type="text"
        value={value}
        onChange={() => {
          OnValueChange(event, setValue);
        }}
      />
    </div>
  );
};

export default InputWithLabel;
