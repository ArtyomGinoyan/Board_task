import { FC } from "react";

import authStyles from "../pages/autorization/authStyles.module.css";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
}

const Button: FC<IProps> = (props) => {
  const { buttonName, ...rest } = props;
  return (
    <div className={authStyles.buttonContainer}>
      <button {...rest}>{buttonName}</button>
    </div>
  );
};

export default Button;
