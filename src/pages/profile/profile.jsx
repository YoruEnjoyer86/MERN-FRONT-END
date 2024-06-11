import { React, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import AccountDetailsCard from "../../components/AccountDetailsCard/AccountDetailsCard";
import UserOptionsColumn from "../../components/UserOptionsColumn/UserOptionsColumn";
import "./profile.css";
import axios from "axios";
import base_url from "../../base_url";

axios.defaults.withCredentials = true;

const profile = () => {
  const navigate = useNavigate();

  const ProfileInitialize = async () => {
    let token = localStorage.getItem("access_token");
    let res = await axios.post(base_url + "/profile", {
      token,
    });
    if (res.status === 200) {
      // console.log(res);
      setUserName(res.data.username);
      setEmail(res.data.email);
      setNickname(res.data.nickname);
      setPhone(res.data.phone);
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    ProfileInitialize();
    window.scrollTo(0, 0);
  }, []);

  const HandleProfileClick = () => {
    navigate("/profile");
  };

  const HandleFavoritesClick = () => {
    navigate("/favorites");
  };

  const HandleLogoutClick = async () => {
    localStorage.removeItem("access_token");
    navigate("/register");
  };

  const HandleShoppingCartClick = () => {
    navigate("/shopping_cart");
  };
  const HandleAddItemToCart = (productName) => {
    setCartNotifications(cartNotifications + 1);
    alert("Added " + productName + " to your cart!");
  };
  const [userName, setUserName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="profile_page">
      <NavBar />
      <div className="row_thing">
        <UserOptionsColumn OnLogout={HandleLogoutClick} />
        <AccountDetailsCard
          name={userName}
          nickname={nickname}
          phone={phone}
          email={email}
        />
      </div>
    </div>
  );
};

export default profile;
