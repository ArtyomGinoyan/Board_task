import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

import More from './More';
import Input from '../../components/Input';
import Button from '../../components/Buttons/Button';

import { authState } from '../../types/authTypes';
import { loginAction } from '../../redux/auth/authSlice';

import authStyles from '../../assets/css/authStyles.module.css';

const Login: FC = () => {
	const dispatch = useDispatch();

	const [state, setState] = useState<authState>({
		email: '',
		password: '',
	});
	const submit = async () => {
		dispatch(loginAction(state));
	};
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value } as Pick<authState, keyof authState>);
		return;
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1, type: 'ease' }}
			className={authStyles.login}
		>
			<div className={authStyles.names}>
				<h1>Login</h1>
			</div>
			<Input type="text" name="email" required={true} onChange={handleInput} />
			<Input type="password" name="password" required={true} onChange={handleInput} />
			<Button
				onClick={submit}
				buttonName="Login"
				className={authStyles.button}
				classContainer={authStyles.buttonContainer}
			/>
			<More auth="Sign Up" to="/register" about="Don't have an account?" />
		</motion.div>
	);
};

export default Login;
