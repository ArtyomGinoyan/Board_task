import { FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Input from './Input';
import Buttons from './Buttons/Buttons';

import { useOutsideClick } from '../hooks/useOutsideClick';
import { updateColumnNameAction } from '../redux/board/boardSlice';

import columnStyles from '../assets/css/column.module.css';
import { toast } from 'react-toastify';

interface IAppProps {
	id: number;
	title: string;
	cardsLength: number;
}

const ColumnHeader: FC<IAppProps> = (props) => {
	const wrapperRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [visible, setVisible] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	useOutsideClick(wrapperRef, setVisible);

	const changeColumnName = (e: any) => {
		if (inputRef.current?.value === '') {
			toast.error('Please fill in this field');
			setVisible(true);
			inputRef.current.focus();
			return;
		}
		dispatch(
			updateColumnNameAction({
				id: +e.target.id,
				title: inputRef.current?.value,
				navigate: navigate,
			})
		);
	};
	const { id, title, cardsLength } = props;
	return (
		<div className={columnStyles.header} ref={wrapperRef}>
			{!visible && (
				<>
					<div
						onClick={() => {
							setVisible(true);
						}}
						className={columnStyles.columnName}
					>
						<h3>{title}</h3>
					</div>
					<div className={columnStyles.cardsCount}>{cardsLength} cards</div>
				</>
			)}
			{visible && (
				<>
					<Input
						autoFocus={true}
						inputRef={inputRef}
						defaultValue={title}
						className={columnStyles.headerInput}
						classContainer={columnStyles.headerInputWrap}
					/>
					<Buttons setVisible={setVisible} getValue={changeColumnName} id={id} />
				</>
			)}
		</div>
	);
};

export default ColumnHeader;
