import { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import CardPopup from './CardPopup';
import DeletePopup from './DeletePopup';
import UpdateProfile from './UpdateProfile';

import { dataOwnerSelector } from '../../redux/cardOwner/cardOwnerSelector';
import { getOwnerAction, resetOwnerDataAction } from '../../redux/cardOwner/cardOwnerSlice';

import { FullCardData } from '../../types/cardTypes';

import popupStyles from '../../assets/css/popup.module.css';

export interface IAppProps {
	wrapperRef: React.RefObject<HTMLDivElement>;
	cardData: FullCardData | null;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	source: string;
}

const Popup: FC<IAppProps> = (props) => {
	const { cardData, setIsOpen, source } = props;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		if (source !== 'update') {
			dispatch(getOwnerAction({ id: cardData?.userId, navigate: navigate }));
		}
		return () => {
			dispatch(resetOwnerDataAction());
		};
	}, []);
	const owner = useSelector(dataOwnerSelector);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1, type: 'ease' }}
			className={popupStyles.container}
			ref={props.wrapperRef}
		>
			<div className={popupStyles.wrapper}>
				{source === 'info' && <CardPopup cardData={cardData} setIsOpen={setIsOpen} owner={owner} />}
				{source === 'delete' && <DeletePopup cardData={cardData} setIsOpen={setIsOpen} owner={owner} />}
				{source === 'update' && <UpdateProfile setIsOpen={setIsOpen} />}
			</div>
		</motion.div>
	);
};
export default Popup;
