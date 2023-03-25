import { FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Input from "./Input";
import Buttons from "./Buttons";

import { useOutsideClick } from "../hooks/useOutsideClick";
import { updateColumnNameAction } from "../redux/board/boardSlice";

import deleteButton from "../assets/images/delete.svg";
import columnStyles from "../assets/css/column.module.css";

interface IAppProps {
  id: number;
  title: string;
  cardsLength: number;
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
  const { id, title, cardsLength } = props;
  return (
    <div className={columnStyles.header} ref={wrapperRef}>
      {!visible && (
        <>
          <div
            onClick={() => {
              setVisible(true);
            }}
            className={columnStyles.columnName}>
            <h3>{title}</h3>
          </div>
          <div className={columnStyles.cardsCount}>{cardsLength} cards</div>
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
            defaultValue={title}
            className={columnStyles.headerInput}
            classContainer={columnStyles.headerInputWrap}
          />
          <Buttons
            setVisible={setVisible}
            getValue={changeColumnName}
            id={id}
          />
        </>
      )}
    </div>
  );
};

export default ColumnHeader;
