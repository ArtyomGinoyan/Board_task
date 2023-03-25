import { FC } from "react";

import { FullCardData } from "../types/cardTypes";

import popupStyles from "../assets/css/popup.module.css";

export interface IAppProps {
  wrapperRef: React.RefObject<HTMLDivElement>;
  cardData: FullCardData | null;
}

const Popup: FC<IAppProps> = (props) => {
  return (
    <div className={popupStyles.container} ref={props.wrapperRef}>
      <div>{props.cardData?.content}</div>
      <div>{props.cardData?.name}</div>
    </div>
  );
};
export default Popup;
