import React, { useEffect } from "react";
import "./PopupNotification.css";

const PopupNotification = ({
  isVisible,
  setVisible,
  secondsVisible,
  children,
  lastTimeOut,
}) => {
  const CloseAfterDelay = () => {
    if (lastTimeOut != undefined) clearTimeout(lastTimeOut);
    lastTimeOut = setTimeout(() => {
      setVisible(false);
    }, 1000 * secondsVisible);
  };

  useEffect(() => {
    if (isVisible === true) CloseAfterDelay();
  }, [isVisible]);

  return <div className="popup_notification_container">{children}</div>;
};

export default PopupNotification;
