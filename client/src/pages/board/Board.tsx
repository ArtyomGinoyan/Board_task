import { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Header from '../../components/Header';
import Column from '../../components/Column';
import EmptyData from '../../components/EmptyData';
import CreateColumn from '../../components/CreateColumn';

import { useModal } from '../../hooks/useModal';
import { dataSelector } from '../../redux/board/boardSelector';
import { getDataAction, moveCardAction, resetDataAction } from '../../redux/board/boardSlice';

import { FullCardData } from '../../types/cardTypes';
import { FullBoardData } from '../../types/boardTypes';

import boardStyles from '../../assets/css/board.module.css';

export interface el {
	id: number;
	title: string;
	cards: FullCardData[];
}
const Board: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { openModal } = useModal();

	const data = useSelector(dataSelector);
	useEffect(() => {
		dispatch(getDataAction(navigate));
		return () => {
			dispatch(resetDataAction());
		};
	}, []);
	const onDragEnd = (result: DropResult) => {
		dispatch(
			moveCardAction({
				source: result?.source,
				destination: result?.destination,
				cardId: result?.draggableId,
				navigate,
			})
		);
	};

	return (
		<>
			<Header openModal={openModal} />
			<CreateColumn />
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 1, type: 'easeIn' }}
				className={boardStyles.container}
			>
				{!data.length ? (
					<EmptyData />
				) : (
					<div className={boardStyles.wrap}>
						<DragDropContext onDragEnd={(results) => onDragEnd(results)}>
							{data.map((el: FullBoardData) => {
								return <Column el={el} key={el.id + el.title} openModal={openModal} />;
							})}
						</DragDropContext>
					</div>
				)}
			</motion.div>
		</>
	);
};

export default Board;
