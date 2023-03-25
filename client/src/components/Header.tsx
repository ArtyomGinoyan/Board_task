import { FC, useRef } from "react";
import { useDispatch } from "react-redux";

import Input from "./Input";
import Buttons from "./Buttons";

import { addColumnAction } from "../redux/board/boardSlice";

import columnStyles from "../assets/css/column.module.css";
import headerStyles from "../assets/css/header.module.css";

export interface IAppProps {}

const Header: FC<IAppProps> = (props) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const clearValue = () => {
    if (inputRef.current) inputRef.current.value = "";
  };
  const addColumn = (e: any) => {
    if (inputRef.current) {
      dispatch(addColumnAction({ title: inputRef.current.value }));
      inputRef.current.value = "";
    }
  };
  return (
    <div className={headerStyles.container}>
      <div className={headerStyles.inputContainer}>
        <Input
          inputRef={inputRef}
          placeholder="Create New Column"
          className={columnStyles.headerInput}
          classContainer={columnStyles.headerInputWrap}
        />
        <Buttons clearValue={clearValue} getValue={addColumn} />
      </div>
    </div>
  );
};
export default Header;
