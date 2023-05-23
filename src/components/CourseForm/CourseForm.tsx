import { useState, MouseEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { TAuthor, TFormData, TSetCourse } from '../../types';
import { Textarea } from '../../common/Textarea';
import {
	ADD_COURSE_TITLE_LABEL,
	BUTTON_CREATE_COURSE_TEXT,
	ADD_COURSE_DESCRIPTION_PLACEHOLDER_TEXT,
	ADD_COURSE_TITLE_PLACEHOLDER_TEXT,
	ADD_COURSE_DESCRIPTION_LABEL,
	BUTTON_ADD_AUTHOR_ITEM_NAME_TEXT,
	BUTTON_DELETE_AUTHOR_ITEM_NAME_TEXT,
	ADD_COURSE_AUTHORS_TITLE,
	ADD_COURSE_AUTHORS_EMPTY_LIST,
	ADD_COURSE_COURSE_AUTHORS_TITLE,
	ADD_COURSE_COURSE_AUTHORS_EMPTY_LIST,
	BUTTON_UPDATE_COURSE_TEXT,
} from '../../constants';
import { CourseDuration } from './components/CourseDuration';
import { CreateAuthor } from './components/CreateAuthor';
import { AuthorItemsList } from './components/AuthorItemsList';
import { addAuthor } from '../../store/authors/authorsSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addCourse, updateCourse } from '../../store/courses/coursesSlice';
import { selectAuthors } from '../../store/authors/authors.selectors';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectIsUserRoleAdmin } from '../../store/user/user.selectors';
import { selectCourses } from '../../store/courses/courses.selectors';

export const CourseForm = () => {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const authors = useAppSelector(selectAuthors);
	const isAdmin = useAppSelector(selectIsUserRoleAdmin);
	const coursesList = useAppSelector(selectCourses);

	const formState = {
		authorsList: authors,
		courseTitle: '',
		courseDescription: '',
		newAuthorName: '',
		courseDuration: '',
		courseAuthors: [],
	};

	const [formData, setFormData] = useState<TFormData>(formState);

	const currentCourse =
		courseId && coursesList.filter((item) => item.id === courseId)[0];

	useEffect(() => {
		setFormData({
			...formData,
			authorsList: authors,
		});
	}, [authors]);

	useEffect(() => {
		if (currentCourse && isAdmin) {
			const newCourseAuthors = formData.authorsList.filter(({ id }) =>
				currentCourse.authors.includes(id)
			);
			const currentAuthors = newCourseAuthors.map((item) => item.id);

			const updatedInitialList: TAuthor[] = authors.filter(
				({ id }) => !currentAuthors.includes(id)
			);

			setFormData({
				...formData,
				authorsList: updatedInitialList,
				courseTitle: currentCourse.title,
				courseDescription: currentCourse.description,
				courseDuration: currentCourse.duration.toString(),
				courseAuthors: newCourseAuthors,
			});
		}
	}, [currentCourse, isAdmin]);

	const handleDurationChange = (value: string) => {
		const time = Number(value) > 0 ? value : '';
		setFormData({
			...formData,
			courseDuration: time,
		});
	};

	const moveAuthorsBetweenLists = (
		id: string,
		initialList: TAuthor[],
		newList: TAuthor[],
		isFirstRender?: boolean
	) => {
		const removedItemFromInitialList = initialList.filter(
			(author) => author.id === id
		)[0];

		const updatedInitialList = initialList.filter((author) => author.id !== id);

		const updatedNewList = [...newList, removedItemFromInitialList];
		if (isFirstRender) {
			setFormData({
				...formData,
				authorsList: updatedInitialList,
				courseAuthors: updatedNewList,
			});
		} else {
			setFormData({
				...formData,
				courseAuthors: updatedInitialList,
				authorsList: updatedNewList,
			});
		}
	};

	const handleAuthorsClick = (e: MouseEvent<HTMLButtonElement>) => {
		const id = e.currentTarget.id;
		moveAuthorsBetweenLists(
			id,
			formData.authorsList,
			formData.courseAuthors,
			true
		);
	};

	const handleCourseAuthorClick = (e: MouseEvent<HTMLButtonElement>) => {
		const id = e.currentTarget.id;
		moveAuthorsBetweenLists(id, formData.courseAuthors, formData.authorsList);
	};

	const handleCreateAuthor = () => {
		if (formData.newAuthorName.length > 1) {
			dispatch(addAuthor(formData.newAuthorName));
			setFormData({
				...formData,
				newAuthorName: '',
			});
		}
	};

	const handleCreateCourse = () => {
		if (
			formData.courseTitle &&
			formData.courseDescription.length > 1 &&
			formData.courseDuration &&
			formData.courseAuthors.length
		) {
			const course: TSetCourse = {
				title: formData.courseTitle,
				description: formData.courseDescription,
				duration: Number(formData.courseDuration),
				authors: formData.courseAuthors.map((item) => item.id),
			};

			currentCourse
				? dispatch(
						updateCourse({
							...course,
							id: currentCourse.id,
							creationDate: currentCourse.creationDate,
						})
				  )
				: dispatch(addCourse(course));
			navigate('/courses');
		} else {
			alert('Please, fill in all fields');
		}
	};

	return (
		<Box
			p={2}
			display='flex'
			flexDirection='column'
			border={2}
			borderColor='purple'
		>
			<Box
				mb={2}
				display='flex'
				justifyContent='space-between'
				alignItems='flex-end'
			>
				<Box>
					<Input
						value={formData.courseTitle}
						placeholder={ADD_COURSE_TITLE_PLACEHOLDER_TEXT}
						labelText={ADD_COURSE_TITLE_LABEL}
						handleChange={(e) => setFormData({ ...formData, courseTitle: e })}
					/>
				</Box>
				<Button
					onClick={handleCreateCourse}
					buttonText={
						currentCourse && isAdmin
							? BUTTON_UPDATE_COURSE_TEXT
							: BUTTON_CREATE_COURSE_TEXT
					}
				/>
			</Box>

			<Box mb={2}>
				<Textarea
					value={formData.courseDescription}
					handleChange={(e) =>
						setFormData({ ...formData, courseDescription: e })
					}
					labelText={ADD_COURSE_DESCRIPTION_LABEL}
					placeholder={ADD_COURSE_DESCRIPTION_PLACEHOLDER_TEXT}
				/>
			</Box>

			<Box
				sx={{
					p: 2,
					border: '2px solid grey',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Box maxWidth='50%' width='100%'>
					<CreateAuthor
						authorName={formData.newAuthorName}
						setAuthorName={(e) =>
							setFormData({ ...formData, newAuthorName: e })
						}
						handleCreateAuthor={handleCreateAuthor}
					/>
					<CourseDuration
						courseDuration={formData.courseDuration.toString()}
						handleDurationChange={handleDurationChange}
					/>
				</Box>
				<Box maxWidth='50%' width='100%'>
					<AuthorItemsList
						authorsList={formData.authorsList}
						title={ADD_COURSE_AUTHORS_TITLE}
						emptyListText={ADD_COURSE_AUTHORS_EMPTY_LIST}
						buttonText={BUTTON_ADD_AUTHOR_ITEM_NAME_TEXT}
						onClick={handleAuthorsClick}
					/>

					<AuthorItemsList
						authorsList={formData.courseAuthors}
						title={ADD_COURSE_COURSE_AUTHORS_TITLE}
						emptyListText={ADD_COURSE_COURSE_AUTHORS_EMPTY_LIST}
						buttonText={BUTTON_DELETE_AUTHOR_ITEM_NAME_TEXT}
						onClick={handleCourseAuthorClick}
					/>
				</Box>
			</Box>
		</Box>
	);
};
