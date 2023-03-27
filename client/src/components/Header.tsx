import { FC, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { userSelector } from '../redux/auth/authSelector';
import { useOutsideClick } from '../hooks/useOutsideClick';

import { FullCardData } from '../types/cardTypes';

import { logoutAction } from '../redux/auth/authSlice';
import headerStyles from '../assets/css/header.module.css';

export interface IAppProps {
	openModal: (data: FullCardData | null, source: string) => void;
}

const Header: FC<IAppProps> = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [visible, setVisible] = useState(false);
	const { name } = useSelector(userSelector);
	const ref = useRef(null);
	useOutsideClick(ref, setVisible);
	const logout = () => {
		localStorage.removeItem('user');
		dispatch(logoutAction(navigate));
	};
	return (
		<header className={headerStyles.container}>
			<div className={headerStyles.headerContent}>
				<div className={headerStyles.headerLogo}>
					<h1>Board</h1>
				</div>
				<div className={headerStyles.userSide} onClick={() => setVisible(true)}>
					<div className={headerStyles.userIcon}>
						<Avatar name={name} size="34" textSizeRatio={1.75} round="20px" color="#2F497D" fgColor="#fff" />
					</div>
					{visible && (
						<div className={headerStyles.userInfo} id="update" ref={ref}>
							<div
								className={headerStyles.logout}
								onClick={() => {
									logout();
								}}
							>
								Log out
							</div>
							<div
								data-id="update"
								className={headerStyles.logout}
								onClick={() => {
									setVisible(false);
									props.openModal(null, 'update');
								}}
							>
								Update profile
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};
export default Header;
