import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import Header from "../../components/Header";
import Column from "../../components/Column";

import { useModal } from "../../hooks/useModal";
import { dataSelector } from "../../redux/board/boardSelector";
import { getDataAction, moveCardAction } from "../../redux/board/boardSlice";

import { FullCardData } from "../../types/cardTypes";
import { FullBoardData } from "../../types/boardTypes";
import boardStyles from "../../assets/css/board.module.css";

export interface IBoardProps {}
export interface el {
  id: number;
  title: string;
  cards: FullCardData[];
}
const Board: FC<IBoardProps> = (props) => {
  const dispatch = useDispatch();
  const { openModal } = useModal();

  const data = useSelector(dataSelector);
  useEffect(() => {
    dispatch(getDataAction());
  }, []);
  const onDragEnd = (result: DropResult) => {
    // the only one that is required
    console.log("ssssss");
    dispatch(
      moveCardAction({
        source: result?.source,
        destination: result?.destination,
        cardId: result?.draggableId,
      }),
    );
    console.log(result);
  };
  return (
    <>
      <Header />
      <div className={boardStyles.container}>
        <div className={boardStyles.wrap}>
          <DragDropContext onDragEnd={(results) => onDragEnd(results)}>
            {data.map((el: FullBoardData) => {
              return (
                <Column el={el} key={el.id + el.title} openModal={openModal} />
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default Board;
