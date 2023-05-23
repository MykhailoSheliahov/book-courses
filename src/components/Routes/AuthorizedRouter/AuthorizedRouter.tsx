import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectUserToken } from '../../../store/user/user.selectors';

type TAuthorizedRouter = {
	children: React.ReactElement;
};

type TForceAuthorizedUserToRoute = {
	route: string;
	children: React.ReactElement;
};

export const AuthorizedRouter = ({ children }: TAuthorizedRouter) => {
	const isAuthorized = useAppSelector(selectUserToken);

	return isAuthorized ? children : <Navigate to='/login' />;
};

export const ForceAuthorizedUserToRoute = ({
	route,
	children,
}: TForceAuthorizedUserToRoute) => {
	const isAuthorized = useAppSelector(selectUserToken);
	return isAuthorized ? <Navigate to={route} /> : children;
};
