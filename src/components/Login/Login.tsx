import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import {
	LOGIN_HEADER,
	BUTTON_REGISTRATION_TEXT,
	LOGIN_HELPER_TEXT,
} from '../../constants';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getUserData, userLogin } from '../../store/user/userSlice';
import { TLoginCredentials } from '../../types';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectUserToken } from '../../store/user/user.selectors';

export const Login = () => {
	const loginCredentials = {
		email: '',
		password: '',
	};

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const token = useAppSelector(selectUserToken);
	const [loginData, setLoginData] =
		useState<TLoginCredentials>(loginCredentials);

	useEffect(() => {
		if (token) {
			localStorage.setItem('userToken', token);
			dispatch(getUserData());
			navigate('/courses');
		}
	}, [token, navigate, dispatch]);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(userLogin(loginData));
	};

	return (
		<Box border={2} borderColor='blue' position='relative' height='600px'>
			<Box
				width={400}
				sx={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: ' translate(-50%, -50%)',
				}}
			>
				<Typography variant='h5' fontWeight='bold' textAlign='center'>
					{LOGIN_HEADER}
				</Typography>
				<form
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
					onSubmit={(e) => {
						handleLogin(e);
					}}
				>
					<Input
						value={loginData.email}
						labelText='Email'
						type='email'
						placeholder='Enter email'
						handleChange={(e) => setLoginData({ ...loginData, email: e })}
					/>

					<Input
						value={loginData.password}
						labelText='Password'
						type='password'
						placeholder='Enter password'
						handleChange={(e) => setLoginData({ ...loginData, password: e })}
					/>
					<Button
						type='submit'
						buttonText='Login'
						sx={{
							alignSelf: 'center',
							mt: 2,
						}}
					/>
				</form>
				<Typography mt={2} textAlign='center'>
					{LOGIN_HELPER_TEXT}
					<br />
					<Link
						to='/registration'
						style={{ textDecoration: 'none', color: 'blue' }}
					>
						{BUTTON_REGISTRATION_TEXT}
					</Link>
				</Typography>
				<hr />
			</Box>
		</Box>
	);
};
