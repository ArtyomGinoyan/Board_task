import { FC } from "react";

import authStyles from "../pages/autorization/authStyles.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    classContainer?: string;
}

const Input: FC<IProps> = (props) => {
    const { type, classContainer = authStyles.inputWrapper, ...rest } = props;

    return (
        <div className={classContainer}>
            <input {...rest} type={type} />
            {rest.className ? null : (
                <span
                    className={authStyles["focus-input"]}
                    data-placeholder={rest.name}
                />
            )}
        </div>
    );
};

export default Input;
