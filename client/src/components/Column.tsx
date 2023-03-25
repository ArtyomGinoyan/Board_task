import { FC } from "react";

import { StrictModeDroppable } from "../helpers/StrictModeDroppable";

import Card from "./Card";
import CreateCard from "./CreateCard";
import ColumnHeader from "./ColumnHeader";

import { FullCardData } from "../types/cardTypes";
import { FullBoardData } from "../types/boardTypes";

import columnStyles from "../assets/css/column.module.css";

export interface IColumnProps {
  el: FullBoardData;
  openModal: (data: FullCardData) => void;
}

const Column: FC<IColumnProps> = (props) => {
  const { el } = props;
  return (
    <div className={columnStyles.container}>
      <StrictModeDroppable
        children={(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={columnStyles.wraper}>
            <ColumnHeader
              id={el.id}
              title={el.title}
              cardsLength={el.cards.length}
            />
            {el.cards.map((el, i) => {
              return (
                <Card
                  el={el}
                  key={el.content + el.id}
                  openModal={props.openModal}
                />
              );
            })}
            <CreateCard id={el.id} cardsLlength={el.cards.length} />
            {provided.placeholder}
          </div>
        )}
        droppableId={`${el.id}`}
      />
    </div>
  );
};

export default Column;
