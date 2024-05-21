import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [action, setAction] = useState("Sign Up");

  const HandleLogin = async () => {
    if (action != "Login") setAction("Login");
    else if (email != "" && password != "") {
      let res = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      if (res.data.ok) navigate("/profile");
      else console.log(res.data.message);
    } else console.log("Missing field!");
  };

  const HandleSignUp = async () => {
    if (action != "Sign Up") setAction("Sign Up");
    else if (email != "" && password != "" && name != "") {
      let res = await axios.post("http://localhost:3001/api/sign_up", {
        name,
        email,
        password,
      });
      if (res.data.ok) navigate("/profile");
      else console.log("ERROR AT SAVING ACCOUNT");
    } else console.log("Missing field!");
  };

  return (
    <div className="register_page">
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
          <span className="space"></span>
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
