import { FC, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Input from './Input';
import Buttons from './Buttons/Buttons';

import { useOutsideClick } from '../hooks/useOutsideClick';

import { userSelector } from '../redux/auth/authSelector';
import { addCardAction } from '../redux/board/boardSlice';

import columnStyles from '../assets/css/column.module.css';

export interface IAppProps {
	id: number;
	cardsLlength: number;
}

const CreateCard: FC<IAppProps> = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const wrapperRef = useRef(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const user = useSelector(userSelector);
	const [visible, setVisible] = useState(false);
	useOutsideClick(wrapperRef, setVisible);

	const createNewCard = (e: any) => {
		if (inputRef.current?.value === '') {
			toast.error('Please fill in this field');
			setVisible(true);
			inputRef.current.focus();
			return;
		}
		dispatch(
			addCardAction({
				userId: user.id,
				content: inputRef.current?.value,
				columnId: +e.target.id,
				position: props.cardsLlength,
				navigate: navigate,
			})
		);
	};

	return (
		<div className={columnStyles.createContainer} ref={wrapperRef}>
			{!visible && (
				<>
					<div
						onClick={() => {
							setVisible(true);
						}}
						className={columnStyles.createWrap}
					>
						<div>+</div>
						<h3>Create Card</h3>
					</div>
				</>
			)}
			{visible && (
				<>
					<Input
						autoFocus={true}
						inputRef={inputRef}
						className={columnStyles.headerInput}
						classContainer={columnStyles.headerInputWrap}
					/>
					<Buttons setVisible={setVisible} getValue={createNewCard} id={props.id} />
				</>
			)}
		</div>
	);
};
export default CreateCard;
