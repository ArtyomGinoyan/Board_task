import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Button from '../Buttons/Button';
import CloseButton from '../Buttons/CloseButton';

import { authState } from '../../types/authTypes';
import { FullCardData } from '../../types/cardTypes';
import { removeCardAction } from '../../redux/board/boardSlice';

import danger from '../../assets/images/danger.svg';
import popupStyles from '../../assets/css/popup.module.css';

export interface DeletePopupProps {
	cardData: FullCardData | null;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	owner: authState;
}

const DeletePopup: FC<DeletePopupProps> = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cardData, setIsOpen, owner } = props;
	return (
		<>
			<CloseButton setIsOpen={setIsOpen} />
			<div className={popupStyles.formWrap}>
				<h1 className={popupStyles.dangerWrap}>
					<div>
						<span>
							<img src={danger} alt="danger" />
						</span>
						<span>Delete card with ID:{cardData?.id}</span>
					</div>
					<p>Owner: {owner.name}</p>
				</h1>
				<h3 className={popupStyles.dangerInfo}>
					<span>
						You're about to permanently delete this card, its content and attachments, and all of its data.
					</span>
					<span>If you're not sure, you can resolve or close this card instead.</span>
				</h3>
			</div>
			<div className={popupStyles.buttonContainer}>
				<Button
					onClick={() => {
						dispatch(removeCardAction({ cardData, navigate }));
						setIsOpen(false);
					}}
					buttonName="Delete"
					className={popupStyles.delete}
					classContainer={popupStyles.buttonWrap}
				/>
				<Button
					onClick={() => {
						setIsOpen(false);
					}}
					buttonName="Cancel"
					className={popupStyles.cancel}
					classContainer={popupStyles.buttonWrap}
				/>
			</div>
		</>
	);
};
export default DeletePopup;
