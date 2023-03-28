import { FC, useRef } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Input from './Input';
import Buttons from './Buttons/Buttons';

import { addColumnAction } from '../redux/board/boardSlice';
import headerStyles from '../assets/css/header.module.css';
import columnStyles from '../assets/css/column.module.css';

export interface CreateColumnProps {}

const CreateColumn: FC<CreateColumnProps> = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement>(null);
	const clearValue = () => {
		if (inputRef.current) inputRef.current.value = '';
	};
	const addColumn = (e: any) => {
		
		if (inputRef.current?.value === '') {
			toast.error('Please fill in this field');
			inputRef.current.focus();
			return;
		}
		if (inputRef.current) {
			dispatch(addColumnAction({ title: inputRef.current.value, navigate }));
			inputRef.current.value = '';
		}
	};
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 0.8 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1, type: 'ease' }}
			className={columnStyles.inputContaier}
		>
			<div className={headerStyles.inputContainer}>
				<Input
					id="createColumn"
					name="createColumn"
					inputRef={inputRef}
					placeholder="Create new column"
					className={columnStyles.headerInput}
					classContainer={columnStyles.headerInputWrap}
				/>
				<Buttons clearValue={clearValue} getValue={addColumn} />
			</div>
		</motion.div>
	);
};
export default CreateColumn;
