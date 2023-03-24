import { FC } from "react";
import Card from "./Card";
import CreateCard from "./CreateCard";
import ColumnHeader from "./ColumnHeader";
import { StrictModeDroppable } from "../helpers/StrictModeDroppable";
// import { v4 as uuidv4 } from 'uuid';

import { FullBoardData } from "../types/boardTypes";

import columnStyles from "../assets/css/column.module.css";
export interface IColumnProps {
  el: FullBoardData;
}

const Column: FC<IColumnProps> = (props) => {
  return (
    <div className={columnStyles.container}>
      <StrictModeDroppable
        children={(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={columnStyles.wraper}>
            <ColumnHeader
              id={props.el.id}
              title={props.el.title}
              cardsLlength={props.el.cards.length}
            />
            {props.el.cards.map((el, i) => {
              return <Card el={el} key={el.content + el.id} />;
            })}
            <CreateCard id={props.el.id} cardsLlength={props.el.cards.length} />
            {provided.placeholder}
          </div>
        )}
        droppableId={`${props.el.id}`}
      />
    </div>
  );
};

export default Column;
