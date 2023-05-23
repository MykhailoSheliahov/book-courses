import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import {
	REGISTRATION_HEADER,
	REGISTRATION_HELPER_TEXT,
	BUTTON_LOGIN_TEXT,
} from '../../constants';

import { TRegistrationCredentials } from '../../types';
import { userRegistration } from '../../store/user/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export const Registration = () => {
	const registrationCredentials = {
		name: '',
		email: '',
		password: '',
	};
	const [registrationData, setRegistrationData] =
		useState<TRegistrationCredentials>(registrationCredentials);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(userRegistration(registrationData));
		navigate('/login');
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
					{REGISTRATION_HEADER}
				</Typography>
				<form
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<Input
						value={registrationData.name}
						labelText='Name'
						placeholder='Enter name'
						handleChange={(e) =>
							setRegistrationData({ ...registrationData, name: e })
						}
					/>
					<Input
						value={registrationData.email}
						labelText='Email'
						type='email'
						placeholder='Enter email'
						handleChange={(e) =>
							setRegistrationData({ ...registrationData, email: e })
						}
					/>

					<Input
						value={registrationData.password}
						labelText='Password'
						type='password'
						placeholder='Enter password'
						handleChange={(e) =>
							setRegistrationData({ ...registrationData, password: e })
						}
					/>
					<Button
						type='submit'
						buttonText='Registration'
						sx={{
							alignSelf: 'center',
							mt: 2,
						}}
					/>
				</form>
				<Typography mt={2} textAlign='center'>
					{REGISTRATION_HELPER_TEXT}
					<br />
					<Link to='/login' style={{ textDecoration: 'none', color: 'blue' }}>
						{BUTTON_LOGIN_TEXT}
					</Link>
				</Typography>
				<hr />
			</Box>
		</Box>
	);
};
