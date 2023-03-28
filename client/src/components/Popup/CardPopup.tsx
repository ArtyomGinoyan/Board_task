import { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Input from '../Input';
import TextArea from '../TextArea';
import Button from '../Buttons/Button';
import CloseButton from '../Buttons/CloseButton';

import { FullCardData } from '../../types/cardTypes';

import { authState } from '../../types/authTypes';
import { updateCardAction } from '../../redux/board/boardSlice';

import popupStyles from '../../assets/css/popup.module.css';
import Attachments from '../Attachments';
import Buttons from '../Buttons/Buttons';
import { getFilesAction } from '../../redux/attachFiles/attachFilesSlice';

export interface CardPopupProps {
	cardData: FullCardData | null;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	owner: authState;
}

const CardPopup: FC<CardPopupProps> = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const { cardData, setIsOpen, owner } = props;
	useEffect(() => {
		// console.log(props.cardData?.id);
		
		// dispatch(getFilesAction(props.cardData?.id));
	},[])
	const updateCardData = () => {
		dispatch(
			updateCardAction({
				navigate,
				id: cardData?.id,
				columnId: cardData?.columnId,
				name: inputRef.current?.value,
				content: textAreaRef.current?.value,
			})
		);
	};
	return (
		<>
			<CloseButton setIsOpen={setIsOpen} />
			<div className={popupStyles.formWrap}>
				<div className={popupStyles.cardInfo}>
					<p>Owner: {owner?.name}</p>
					<p>ID: {cardData?.id}</p>
				</div>
				<div className={popupStyles.formNameWrap}>
					<label htmlFor="name">Card name</label>
					<Input
						id="name"
						name="name"
						inputRef={inputRef}
						className={popupStyles.formInput}
						defaultValue={cardData?.name}
						classContainer={popupStyles.formInputWrap}
					/>
				</div>
				<TextArea
					rows={5}
					cols={30}
					id="content"
					name="content"
					textAreaRef={textAreaRef}
					defaultValue={cardData?.content}
					classContainer={popupStyles.formContentWrap}
				/>
				<div className={popupStyles.buttonContainer}>
					<Button
						onClick={() => {
							updateCardData();
							setIsOpen(false);
						}}
						buttonName="update"
						className={popupStyles.button}
						classContainer={popupStyles.buttonWrap}
					/>
				</div>
				<Attachments cardData={cardData} />
			</div>
		</>
	);
};
export default CardPopup;
