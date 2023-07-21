import React, { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import "./InstallPopup.css";

const InstallPopup = () => {
  const [view, setView] = useState(false);

  useEffect(() => {
    // Определяем, является ли устройство iPhone-ом
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone/.test(userAgent);
    };

    // Определяем, запущено ли приложение отдельно
    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;
    // Решаем, показать или не показать уведомление об установке:
    if (isIos() && !isInStandaloneMode()) {
      handleShow();
    }
  }, []);

  const handleShow = () => {
    console.log("Install Popup is showed");
    setView(true);
  };

  const handleHide = () => {
    setView(false);
  };

  return (
    <div
      style={{ display: view ? "block" : "none" }}
      className="speech-bubble-container"
    >
      <div className="speech-bubble">
        <Close className="close-install-message-icon" onClick={handleHide} />
        <div style={{ paddingRight: "15px" }}>
          Установи приложение на свой iPhone: нажми «Поделиться», а затем на
          экран «Домой»
        </div>
      </div>
    </div>
  );
};

export default InstallPopup;
