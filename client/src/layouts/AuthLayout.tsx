import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import Popup from "../components/Popup";

import { authSelector } from "../redux/auth/authSelector";
import { useOutsideClick } from "../hooks/useOutsideClick";

import { FullCardData } from "../types/cardTypes";

import appStyle from "../app.module.css";

const AuthLayout: React.FC = () => {
  const wrapperRef = useRef(null);
  const auth = useSelector(authSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [cardData, setCardData] = useState<FullCardData | null>(null);
  const openModal = (data: FullCardData) => {
    console.log("modal", data);
    setIsOpen(true);
    setCardData(data);
  };
  useOutsideClick(wrapperRef, setIsOpen);
  if (auth) {
    console.log("auth");
    return (
      <>
        {isOpen && <Popup wrapperRef={wrapperRef} cardData={cardData} />}
        <div className={isOpen ? appStyle.opacity : appStyle.wrapper}>
          <Outlet context={{ openModal, isOpen }} />
        </div>
      </>
    );
  }
  console.log("to login");

  return <Navigate to="/login" replace />;
};

export default AuthLayout;
