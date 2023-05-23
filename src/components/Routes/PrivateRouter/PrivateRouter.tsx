import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectUserRole } from '../../../store/user/user.selectors';

type TPrivateRouter = {
	children: React.ReactElement;
};

export const PrivateRouter = ({ children }: TPrivateRouter) => {
	const authRole = useAppSelector(selectUserRole);
	return authRole === 'admin' ? children : <Navigate to='/login' />;
};
