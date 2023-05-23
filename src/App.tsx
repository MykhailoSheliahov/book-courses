import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { Courses } from './components/Courses';
import { Header } from './components/Header';
import { CourseForm } from './components/CourseForm';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { CourseInfo } from './components/CourseInfo';
import {
	AuthorizedRouter,
	ForceAuthorizedUserToRoute,
} from './components/Routes/AuthorizedRouter';
import { useAppDispatch } from './hooks/useAppDispatch';
import { getAuthors } from './store/authors/authorsSlice';
import { getCourses } from './store/courses/coursesSlice';
import { getUserData } from './store/user/userSlice';
import { PrivateRouter } from './components/Routes/PrivateRouter';

function App() {
	const dispatch = useAppDispatch();
	const userToken = localStorage.getItem('userToken');

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getAuthors());
	}, [dispatch]);

	useEffect(() => {
		if (userToken) {
			dispatch(getUserData());
		}
	}, [userToken, dispatch]);

	return (
		<Box
			sx={{
				maxWidth: 1000,
				p: (theme) => theme.spacing(1, 1, 0, 1),
				margin: (theme) => theme.spacing(0, 'auto'),
			}}
		>
			<Header />
			<Routes>
				<Route
					path='/'
					element={
						<ForceAuthorizedUserToRoute route='/courses'>
							<Login />
						</ForceAuthorizedUserToRoute>
					}
				></Route>
				<Route path='/courses'>
					<Route
						index={true}
						element={
							<AuthorizedRouter>
								<Courses />
							</AuthorizedRouter>
						}
					/>
					<Route
						index={false}
						path='add'
						element={
							<AuthorizedRouter>
								<PrivateRouter>
									<CourseForm />
								</PrivateRouter>
							</AuthorizedRouter>
						}
					/>
					<Route
						index={false}
						path=':courseId'
						element={
							<AuthorizedRouter>
								<CourseInfo />
							</AuthorizedRouter>
						}
					/>
					<Route
						index={false}
						path='update/:courseId'
						element={
							<AuthorizedRouter>
								<PrivateRouter>
									<CourseForm />
								</PrivateRouter>
							</AuthorizedRouter>
						}
					/>
				</Route>

				<Route
					path='/registration'
					element={
						<ForceAuthorizedUserToRoute route='/courses'>
							<Registration />
						</ForceAuthorizedUserToRoute>
					}
				/>
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Box>
	);
}

export default App;
