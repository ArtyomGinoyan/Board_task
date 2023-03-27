import img from '../assets/images/error.gif';
import errorMessageStyle from '../assets/css/errorMessage.module.css';

interface IProps {
	message: any;
	error?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorMessage: React.FC<IProps> = (props) => {
	return (
		<div className={errorMessageStyle.error_wrapper}>
			<img className={errorMessageStyle.error_image} src={img} alt="Error" />
			<h2 className={errorMessageStyle.error_title}>{props.message}</h2>
		</div>
	);
};

export default ErrorMessage;
