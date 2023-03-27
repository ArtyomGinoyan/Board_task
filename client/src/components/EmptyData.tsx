import { FC } from 'react';
import empty from '../assets/images/package-cancelled-icon.svg';
import boardStyles from '../assets/css/board.module.css';
export interface IEmptyDataProps {}

const EmptyData: FC<IEmptyDataProps> = (props) => {
	return (
		<div className={boardStyles.empty}>
			<img src={empty} alt="no data" />
			<p>No data yet</p>
		</div>
	);
};
export default EmptyData;
