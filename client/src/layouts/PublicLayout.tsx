import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { authSelector } from '../redux/auth/authSelector';

const PublicLayout = () => {
	const auth = useSelector(authSelector);

	if (!auth) {
		return <Outlet />;
	}

	return <Navigate to="/" replace />;
};

export default PublicLayout;
