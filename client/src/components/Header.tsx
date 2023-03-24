import { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import columnStyles from "../assets/css/column.module.css";
import headerStyles from "../assets/css/header.module.css";
import { addColumnAction } from "../redux/board/boardSlice";
import Buttons from "./Buttons";
import Input from "./Input";
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
          className={columnStyles.headerInput}
          classContainer={columnStyles.headerInputWrap}
        />
        <Buttons clearValue={clearValue} getValue={addColumn} />
      </div>
    </div>
  );
};
export default Header;
