import React, { useEffect, useState, useRef } from "react";
import "./MainSales.css";
import axios from "axios";
import base_url from "../../base_url";

const left_arrow_image = (
  await axios.post(base_url + "/get_image", {
    img_name: "arrow_rounded_left.svg",
  })
).data.img;

const right_arrow_image = (
  await axios.post(base_url + "/get_image", {
    img_name: "arrow_rounded_right.svg",
  })
).data.img;

const MainSales = ({ offers }) => {
  const [displayed_offer_index, set_displayed_offer_index] = useState(0);
  const [continue_switching_offers, set_continue_switching_offers] =
    useState(true);
  let timeout_id = useRef(undefined);

  const SwitchOfferAfterDelay = async () => {
    timeout_id.current = setTimeout(() => {
      set_displayed_offer_index((displayed_offer_index + 1) % offers.length);
    }, 3000);
  };

  useEffect(() => {
    if (continue_switching_offers) SwitchOfferAfterDelay();
  }, [displayed_offer_index]);

  useEffect(() => {
    if (continue_switching_offers == true) SwitchOfferAfterDelay();
    else {
      clearTimeout(timeout_id.current);
    }
  }, [continue_switching_offers]);

  const GoToNextOffer = () => {
    clearTimeout(timeout_id.current);
    set_displayed_offer_index((displayed_offer_index + 1) % offers.length);
  };

  const GoToPrevOffer = () => {
    clearTimeout(timeout_id.current);
    set_displayed_offer_index(
      displayed_offer_index > 0 ? displayed_offer_index - 1 : offers.length - 1
    );
  };

  return (
    <div
      className="main_sales"
      onMouseEnter={() => {
        set_continue_switching_offers(false);
      }}
      onMouseLeave={() => {
        set_continue_switching_offers(true);
      }}
    >
      <button className="arrow_button" onClick={GoToPrevOffer}>
        <img className="arrow" src={left_arrow_image} />
      </button>
      <div className="contents">{offers[displayed_offer_index]}</div>
      <button className="arrow_button" onClick={GoToNextOffer}>
        <img className="arrow" src={right_arrow_image} />
      </button>
    </div>
  );
};

export default MainSales;

//TODO SCHIMBA PATHUL DIN PUBLIC LA IMAGINI IN REQUEST PT IMAGINE DE PE BACKEND
//TODO MAI UITA-TE LA LOCURILE UNDE AI SCHIMBAT, CAUTA "get_image" SI FA IMAGINILE STATE-URI SA EVITI RACE CONDITION-URI
