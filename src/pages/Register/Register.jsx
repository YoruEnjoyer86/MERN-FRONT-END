import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { AppContext } from "../../Contexts/AppContext.js";
import base_url from "../../base_url.js";

const Register = () => {
  const { setIsRegisterPageActive, window_size } = useContext(AppContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [action, setAction] = useState("Sign Up");
  const [seller_account_selected, set_seler_account_selected] = useState(false);

  const HandleLogin = async () => {
    if (action != "Login") setAction("Login");
    else if (email != "" && password != "") {
      let res = await axios.post(base_url + "/api/login", {
        email,
        password,
      });
      if (res.data.ok) {
        navigate("/profile");
        localStorage.setItem("access_token", res.data.access_token);
      } else console.log(res.data.message);
    } else console.log("Missing field!");
  };

  const HandleSignUp = async () => {
    if (action != "Sign Up") setAction("Sign Up");
    else if (email != "" && password != "" && name != "") {
      let res = await axios.post(base_url + "/api/sign_up", {
        name,
        email,
        password,
        user_type: seller_account_selected === true ? 1 : 0,
      });
      if (res.data.ok) {
        localStorage.setItem("access_token", res.data.access_token);
        // console.log("TOKEN FR IS " + res.data.access_token);
        navigate("/profile");
      } else console.log("ERROR AT SAVING ACCOUNT");
    } else console.log("Missing field!");
  };

  useEffect(() => {
    setIsRegisterPageActive(true);
    window.scrollTo(0, 0);
    return () => {
      setIsRegisterPageActive(false);
    };
  }, []);

  useEffect(() => {
    console.log(seller_account_selected);
  }, [seller_account_selected]);

  return (
    <div className="register_page">
      <NavBar />
      <div className="register_form">
        <p className="title">{action}</p>
        {action === "Sign Up" && (
          <div className="input_row">
            <img src="../../../profile.png" className="input_icon" />
            <input
              className="register_input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Your Name"
            />
          </div>
        )}
        <div className="input_row">
          <img src="../../../letter.png" className="input_icon" />
          <input
            className="register_input"
            type="email"
            vlaue={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Your Email"
          />
        </div>

        <div className="input_row">
          <img src="../../../lock.png" className="input_icon" />
          <input
            className="register_input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Your password"
          />
        </div>

        {action === "Login" ? (
          <p className="forgot_password_text">Forgot password?</p>
        ) : (
          <label className="user_type_checkbox_label">
            <p className="seller_account_text">Seller account: </p>
            <input
              value={seller_account_selected}
              onChange={(event) => {
                set_seler_account_selected(event.target.checked);
              }}
              className="user_type_checkbox"
              type="checkbox"
            ></input>
          </label>
        )}

        <div className="register_buttons_row">
          <button
            className={
              "register_button " +
              (action != "Login" && "unselected_register_button")
            }
            onClick={HandleLogin}
          >
            Login
          </button>
          <button
            className={
              "register_button " +
              (action != "Sign Up" && "unselected_register_button")
            }
            onClick={HandleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
