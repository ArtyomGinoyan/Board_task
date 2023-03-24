import { FC, useRef, useState } from "react";

import Input from "./Input";
import Buttons from "./Buttons";

import deleteButton from "../assets/images/delete.svg";

import columnStyles from "../assets/css/column.module.css";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useDispatch } from "react-redux";
import { updateColumnNameAction } from "../redux/board/boardSlice";

interface IAppProps {
  id: number;
  title: string;
  cardsLlength: number;
}

const ColumnHeader: FC<IAppProps> = (props) => {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useOutsideClick(wrapperRef, setVisible);

  const changeColumnName = (e: any) => {
    console.log("change name", e.target.id);
    console.log(inputRef.current?.value);
    dispatch(
      updateColumnNameAction({
        id: +e.target.id,
        title: inputRef.current?.value,
      }),
    );
  };
  return (
    <div className={columnStyles.header} ref={wrapperRef}>
      {!visible && (
        <>
          <div
            onClick={() => {
              setVisible(true);
            }}
            className={columnStyles.columnName}>
            <h3>{props.title}</h3>
          </div>
          <div className={columnStyles.cardsCount}>
            {props.cardsLlength} cards
          </div>
          <div className={columnStyles.deleteColumn}>
            <img src={deleteButton} alt="delete" title="delete column" />
          </div>
        </>
      )}
      {visible && (
        <>
          <Input
            autoFocus={true}
            inputRef={inputRef}
            defaultValue={props.title}
            className={columnStyles.headerInput}
            classContainer={columnStyles.headerInputWrap}
          />
          <Buttons
            setVisible={setVisible}
            getValue={changeColumnName}
            id={props.id}
          />
        </>
      )}
    </div>
  );
};

export default ColumnHeader;
