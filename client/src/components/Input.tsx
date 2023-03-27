import { FC } from 'react';

import authStyles from '../assets/css/authStyles.module.css';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	classContainer?: string;
	inputRef?: React.RefObject<HTMLInputElement>;
}

const Input: FC<IProps> = (props) => {
	const { type, inputRef, classContainer = authStyles.inputWrapper, ...rest } = props;

	return (
		<div className={classContainer}>
			<input {...rest} type={type} ref={inputRef} />
			{rest.className ? null : <span data-placeholder={rest.name} className={authStyles['focus-input']} />}
		</div>
	);
};

export default Input;
