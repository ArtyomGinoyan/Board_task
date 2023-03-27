import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

import Board from './pages/board/Board';
import NotFound from './pages/notfound/NotFound';
import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout';
import Login from './pages/autorization/Login';
import Register from './pages/autorization/Register';

import appStyles from './assets/css/app.module.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<>
			<ToastContainer />
			<AnimatePresence>
				<div className={appStyles.App}>
					<Routes>
						<Route element={<PublicLayout />}>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</Route>
						<Route element={<AuthLayout />}>
							<Route path="/" element={<Board />} />
							<Route path="/board" element={<Board />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</AnimatePresence>
		</>
	);
};

export default App;
