import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import { FullCardData } from "../types/cardTypes";
import cardStyle from "../assets/css/card.module.css";
interface ICardProps {
  id?: number;
  el: FullCardData;
}

const Card: FC<ICardProps> = (props) => {
  return (
    <Draggable draggableId={`${props.el.id}`} index={+props.el.position}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={cardStyle.container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {props.el.content}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
