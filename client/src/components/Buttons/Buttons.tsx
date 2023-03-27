import { FC } from 'react';

import checkedButton from '../../assets/images/checked.svg';
import cancelButton from '../../assets/images/cancel-close.svg';

import columnStyles from '../../assets/css/column.module.css';

export interface IAppProps {
	setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
	getValue?: (e: any) => void;
	clearValue?: () => void;
	id?: number;
}

const Buttons: FC<IAppProps> = (props) => {
	const { setVisible, getValue, id, clearValue } = props;
	return (
		<>
			<div
				onClick={() => {
					if (setVisible) setVisible(false);
					if (clearValue) clearValue();
				}}
				className={columnStyles.cancel}
			>
				<img src={cancelButton} alt="cancel" title="cancel" />
			</div>
			<div
				onClick={(e: any) => {
					if (setVisible) setVisible(false);
					if (getValue) getValue(e);
				}}
				className={columnStyles.checked}
			>
				<img id={`${id}`} alt="accept" title="accept" src={checkedButton} />
			</div>
		</>
	);
};
export default Buttons;
