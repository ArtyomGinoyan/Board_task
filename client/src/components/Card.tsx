import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import { FullCardData } from "../types/cardTypes";

import { useSelector } from "react-redux";
import { userSelector } from "../redux/auth/authSelector";

import deleteButton from "../assets/images/delete.svg";
import cardStyle from "../assets/css/card.module.css";
import { useDispatch } from "react-redux";
import { removeCardAction } from "../redux/board/boardSlice";

interface ICardProps {
  id?: number;
  el: FullCardData;
  openModal: (data: FullCardData) => void;
}

const Card: FC<ICardProps> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const {
    el,
    openModal,
    el: { position, content, id: elemId, userId, columnId },
  } = props;
  const bool = user.id === userId ? false : true;
  const style =
    user.id === userId ? cardStyle.container : cardStyle.containerNoneEvent;
  return (
    <Draggable
      draggableId={`${elemId}`}
      index={+position}
      isDragDisabled={bool}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={style}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <div
            className={cardStyle.infoWrap}
            onClick={() => {
              if (user.id === userId) openModal(el);
            }}>
            <p>{content}</p>
          </div>
          <div className={cardStyle.actionWrap}>
            <img
              src={deleteButton}
              alt="delete"
              title="delete card"
              id={`${elemId}`}
              onClick={() => {
                console.log(elemId, userId, columnId, position);
                if (user.id === userId) {
                  dispatch(removeCardAction(el));
                }
              }}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
