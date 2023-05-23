import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../common/Button';
import {
	BUTTON_ADD_NEW_COURSE_TEXT,
	NO_COURSES_FOUND_TEXT,
} from '../../constants';
import { SearchBar } from './components/SearchBar';
import { CourseCard } from './components/CourseCard';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCourses } from '../../store/courses/courses.selectors';
import { selectAuthors } from '../../store/authors/authors.selectors';
import { selectIsUserRoleAdmin } from '../../store/user/user.selectors';

export const Courses = () => {
	const navigate = useNavigate();
	const coursesList = useAppSelector(selectCourses);
	const authorsList = useAppSelector(selectAuthors);
	const isAdmin = useAppSelector(selectIsUserRoleAdmin);

	const [courses, setCourses] = useState(coursesList);
	const [searchTerm, setSearchTerm] = useState('');

	const renderedCoursesList = courses.map(
		({ id, title, description, authors, duration, creationDate }) => {
			return (
				<CourseCard
					id={id}
					key={id}
					title={title}
					description={description}
					authors={authorsList
						.filter(({ id: ids }) => authors.includes(ids))
						.map((author) => author.name)}
					duration={duration}
					creationDate={creationDate}
				/>
			);
		}
	);

	const searchSubmitHandler = (searchValue: string) => {
		const formatToCompare = (str: string) => str.toLowerCase().trim();
		if (searchValue) {
			setCourses(
				courses.filter(({ title, id }) => {
					const term = formatToCompare(searchValue);
					return (
						formatToCompare(title).indexOf(term) !== -1 ||
						formatToCompare(id).indexOf(term) !== -1
					);
				})
			);
		} else {
			setCourses(coursesList);
		}
	};

	return (
		<Box p={2} border={2} borderColor='cyan'>
			<Box mb={2} display='flex' justifyContent='space-between'>
				<SearchBar
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					searchSubmit={searchSubmitHandler}
				/>
				<Box>
					{isAdmin && (
						<Button
							onClick={() => navigate('/courses/add')}
							buttonText={BUTTON_ADD_NEW_COURSE_TEXT}
						/>
					)}
				</Box>
			</Box>
			{courses.length > 0 && renderedCoursesList}
			{searchTerm && courses.length === 0 && (
				<Typography textAlign='center' variant='h2'>
					{NO_COURSES_FOUND_TEXT}
				</Typography>
			)}
		</Box>
	);
};
