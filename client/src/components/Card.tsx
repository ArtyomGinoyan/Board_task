import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { FullCardData } from '../types/cardTypes';

import { userSelector } from '../redux/auth/authSelector';

import deleteButton from '../assets/images/delete.svg';
import cardStyle from '../assets/css/card.module.css';

interface ICardProps {
	id?: number;
	el: FullCardData;
	openModal: (data: FullCardData, source: string) => void;
}

const Card: FC<ICardProps> = (props) => {
	const user = useSelector(userSelector);
	const {
		el,
		openModal,
		el: { position, content, id: elemId, userId },
	} = props;
	const bool = user.id === userId || user.roles === 'ADMIN' ? false : true;
	const style =
		user.id === userId || user.roles === 'ADMIN' ? cardStyle.container : cardStyle.containerNoneEvent;
	return (
		<Draggable draggableId={`${elemId}`} index={+position} isDragDisabled={bool}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					className={style}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div
						className={cardStyle.infoWrap}
						onClick={() => {
							if (user.id === userId || user.roles === 'ADMIN') openModal(el, 'info');
						}}
					>
						<p>{content}</p>
						<p>ID: {elemId}</p>
					</div>
					<div className={cardStyle.actionWrap}>
						<img
							src={deleteButton}
							alt="delete"
							title="delete card"
							id={`${elemId}`}
							onClick={() => {
								if (user.id === userId || user.roles === 'ADMIN') openModal(el, 'delete');
							}}
						/>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Card;
