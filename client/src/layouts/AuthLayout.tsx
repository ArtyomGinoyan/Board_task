import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import Popup from '../components/Popup/Popup';

import { authSelector } from '../redux/auth/authSelector';
import { useOutsideClick } from '../hooks/useOutsideClick';

import { FullCardData } from '../types/cardTypes';

import appStyle from '../assets/css/app.module.css';

const AuthLayout: React.FC = () => {
	const wrapperRef = useRef(null);
	const auth = useSelector(authSelector);
	const [isOpen, setIsOpen] = useState(false);
	const [source, setSource] = useState('');
	const [cardData, setCardData] = useState<FullCardData | null>(null);
	const openModal = (data: FullCardData | null, source: string) => {
		setIsOpen(true);
		setCardData(data);
		setSource(source);
	};
	useOutsideClick(wrapperRef, setIsOpen);
	if (auth) {
		return (
			<>
				{isOpen && (
					<Popup wrapperRef={wrapperRef} cardData={cardData} setIsOpen={setIsOpen} source={source} />
				)}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1, type: 'ease' }}
					className={isOpen ? appStyle.opacity : appStyle.wrapper}
				>
					<Outlet context={{ openModal, isOpen }} />
				</motion.div>
			</>
		);
	}

	return <Navigate to="/login" replace />;
};

export default AuthLayout;
