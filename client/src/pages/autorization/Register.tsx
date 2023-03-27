import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import More from './More';
import Input from '../../components/Input';
import Button from '../../components/Buttons/Button';

import { authState } from '../../types/authTypes';
import { signUp } from '../../services/authService';

import authStyles from '../../assets/css/authStyles.module.css';

const Register: FC = () => {
	const navigate = useNavigate();
	const [state, setState] = useState<authState>({
		name: '',
		email: '',
		password: '',
	});

	const submit = async () => {
		const response = await signUp(state);
		const message = await response.json();

		if (response.status === 201 && response.ok) {
			navigate('/login');
			toast.success(message);
			return;
		}
		toast.error(message.message);
	};
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setState({ ...state, [e.target.name]: e.target.value } as Pick<authState, keyof authState>);
	};
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1, type: 'ease' }}
			className={authStyles.register}
		>
			<div className={authStyles.names}>
				<h1>Register</h1>
			</div>
			<Input type="text" name="name" required={true} onChange={handleInput} />
			<Input type="text" name="email" required={true} onChange={handleInput} />
			<Input type="password" name="password" required={true} onChange={handleInput} />
			<Button
				onClick={submit}
				buttonName="REGISTER"
				className={authStyles.button}
				classContainer={authStyles.buttonContainer}
			/>
			<More to="/login" auth="Log in" about="Already have an account?" />
		</motion.div>
	);
};

export default Register;
