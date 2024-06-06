import React, { useEffect, useState, useRef } from "react";
import "./MainSales.css";

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

    set_displayed_offer_index((displayed_offer_index - 1) % offers.length);
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
        <img
          className="arrow"
          src="../../../../public/arrow_rounded_left.svg"
        />
      </button>
      <div className="contents">{offers[displayed_offer_index]}</div>
      <button className="arrow_button" onClick={GoToNextOffer}>
        <img
          className="arrow"
          src="../../../../public/arrow_rounded_right.svg"
        />
      </button>
    </div>
  );
};

export default MainSales;
