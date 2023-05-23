import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { Button } from '../../common/Button';
import { Logo } from './components/Logo';
import { BUTTON_LOGOUT_TEXT } from '../../constants';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { userLogout } from '../../store/user/userSlice';
import {
	selectIsUserRoleAdmin,
	selectUserIsAuth,
	selectUserName,
	selectUserRole,
} from '../../store/user/user.selectors';
import { showUserAuthInfo } from '../../helpers/showUserAuthInfo';

export const Header = () => {
	const isAuth = useAppSelector(selectUserIsAuth);
	const name = useAppSelector(selectUserName);
	const userRole = useAppSelector(selectUserRole);
	const isAdmin = useAppSelector(selectIsUserRoleAdmin);
	const dispatch = useAppDispatch();

	const [userName, setUserName] = useState('');
	const location = useLocation();

	const shouldShowUserAuthInfo = showUserAuthInfo(location.pathname);

	useEffect(() => {
		if (isAuth) {
			setUserName(name);
		}
	}, [name, isAuth]);

	const handleClick = () => {
		dispatch(userLogout());
		localStorage.removeItem('userToken');
	};

	return (
		<Box
			p={1}
			mb={2}
			display='flex'
			justifyContent='space-between'
			alignItems='center'
			border={2}
			borderColor='red'
		>
			<Logo />
			{shouldShowUserAuthInfo && (
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					<Typography mr={3} fontWeight='bold'>
						{isAdmin ? userRole : userName}
					</Typography>
					<Button onClick={handleClick} buttonText={BUTTON_LOGOUT_TEXT} />
				</Box>
			)}
		</Box>
	);
};
