import React, { useState } from "react";
import "./AccountDetailsCard.css";
import axios from "axios";
import base_url from "../../base_url";

const AccountDetailsCard = ({ name, nickname, email, phone }) => {
  const [profilePicture, setProfilePicture] = useState("/no_image.png");

  const OnChangeNickName = () => {
    alert("Changing nickname!");
  };

  const OnEditInformation = () => {
    alert("Editing information");
  };

  const OnEditProfilePicture = () => {
    alert("EDITING PROFILE PICTURE!");
  };

  return (
    <div className="account_details_card">
      <p className="main_text">General information</p>
      <div className="information_part">
        <div className="data_row">
          <div className="profile_image_container">
            <img src={profilePicture} className="profile_picture" />
            <img
              src="/edit_image.png"
              className="edit_image_picture"
              onClick={OnEditProfilePicture}
            ></img>
          </div>
          <div className="text_fields_column">
            <div className="field_row">
              <p className="field_row_text"> {nickname}</p>
              <p
                className="field_row_clickable_text"
                onClick={OnChangeNickName}
              >
                Change Nickname
              </p>
            </div>
            <div className="field_row">
              <p className="field_row_text"> Name</p>
              <p className="field_row_text"> {name}</p>
            </div>
            <div className="field_row">
              <p className="field_row_text"> Email</p>
              <p className="field_row_text"> {email}</p>
            </div>
            <div className="field_row">
              <p className="field_row_text"> Phone number</p>
              <p className="field_row_phone_number">{phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="edit_information_button" onClick={OnEditInformation}>
        <p className="edit_information_text">Edit information</p>
      </div>
    </div>
  );
};

export default AccountDetailsCard;
