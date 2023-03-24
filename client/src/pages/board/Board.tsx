import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../../components/Column";
// import {data} from "../../mockdata"
import { useDispatch } from "react-redux";
import { getDataAction, moveCardAction } from "../../redux/board/boardSlice";
import { dataSelector } from "../../redux/board/boardSelector";
import { FullBoardData } from "../../types/boardTypes";
import { FullCardData } from "../../types/cardTypes";
import boardStyles from "../../assets/css/board.module.css";
import Header from "../../components/Header";
export interface IBoardProps {}
export interface el {
  id: number;
  title: string;
  cards: FullCardData[];
}
export const Board: FC<IBoardProps> = (props) => {
  const dispatch = useDispatch();
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
              return <Column el={el} key={el.id + el.title} />;
            })}
            {/* <div className={boardStyles.addColumn}>+</div> */}
          </DragDropContext>
        </div>
      </div>
    </>
  );
};
