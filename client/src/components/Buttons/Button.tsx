import { FC } from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	buttonName: string;
	classContainer: string;
}

const Button: FC<IProps> = (props) => {
	const { buttonName, classContainer, ...rest } = props;
	return (
		<div className={classContainer}>
			<button {...rest}>{buttonName}</button>
		</div>
	);
};

export default Button;
