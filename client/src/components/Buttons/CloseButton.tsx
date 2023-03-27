import { FC } from 'react';

import cancelButton from '../../assets/images/cancel-close.svg';
import popupStyles from '../../assets/css/popup.module.css';

export interface CloseButtonProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CloseButton: FC<CloseButtonProps> = (props) => {
	return (
		<div className={popupStyles.closeWrap}>
			<div
				className={popupStyles.imageContainer}
				onClick={() => {
					props.setIsOpen(false);
				}}
			>
				<img src={cancelButton} alt="cancel" title="cancel" />
			</div>
		</div>
	);
};
export default CloseButton;
