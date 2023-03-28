import { FC } from 'react';
import { motion } from 'framer-motion';
import empty from '../assets/images/package-cancelled-icon.svg';
import boardStyles from '../assets/css/board.module.css';
export interface IEmptyDataProps {}

const EmptyData: FC<IEmptyDataProps> = (props) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1, type: 'easeIn' }}
			className={boardStyles.empty}
		>
			<img src={empty} alt="no data" />
			<p>No data yet</p>
		</motion.div>
	);
};
export default EmptyData;
