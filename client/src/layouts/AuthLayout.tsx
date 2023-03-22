import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { authSelector } from '../redux/auth/authSelector';


const AuthLayout: React.FC = () => {
	const auth = useSelector(authSelector);
	const dispatch = useDispatch();
	if (auth) {
		console.log("auth");
		return <Outlet />;
	}
	console.log("to login");
	// dispatch()

	return <Navigate to="/login" replace />;
};

export default AuthLayout;
