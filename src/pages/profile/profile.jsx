import { React, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import AccountDetailsCard from "../../components/AccountDetailsCard/AccountDetailsCard";
import UserOptionsColumn from "../../components/UserOptionsColumn/UserOptionsColumn";
import "./profile.css";
import axios from "axios";

axios.defaults.withCredentials = true;

const profile = () => {
  const navigate = useNavigate();

  const CheckUserConnected = async () => {
    let res = await axios.get("http://localhost:3001/check_connected");
    console.log("CONNECTED : " + res.data.ok);
    return res.data.ok;
  };

  const ProfileInitialize = async () => {
    if ((await CheckUserConnected()) == true) {
      axios
        .get("http://localhost:3001/profile")
        .then((res) => {
          console.log(res);
          setUserName(res.data.username);
          setEmail(res.data.email);
          setNickname(res.data.nickname);
          setPhone(res.data.phone);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    ProfileInitialize();
  }, []);

  const HandleProfileClick = () => {
    navigate("/profile");
  };

  const HandleFavoritesClick = () => {
    navigate("/favorites");
  };

  const HandleLogoutClick = async () => {
    let res = await axios.get("http://localhost:3001/logout");
    console.log("RASPUNS LOGOUT : " + res);
    navigate("/register");
  };

  const HandleShoppingCartClick = () => {
    navigate("/shopping_cart");
  };
  const HandleAddItemToCart = (productName) => {
    setCartNotifications(cartNotifications + 1);
    alert("Added " + productName + " to your cart!");
  };

  const [profileNotifications, setProfileNotifications] = useState(1);
  const [favoritesNotifications, setFavoritesNotifications] = useState(0);
  const [cartNotifications, setCartNotifications] = useState(0);
  const [userName, setUserName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="profile_page">
      <NavBar
        notifications={[
          profileNotifications,
          favoritesNotifications,
          cartNotifications,
        ]}
      />
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
