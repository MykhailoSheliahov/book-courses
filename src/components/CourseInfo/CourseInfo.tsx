import { Box, Typography } from '@mui/material';
import { TCourse } from '../../types';
import { formatCreationDate } from '../../helpers/formatCreationDate';
import { getCoursesDuration } from '../../helpers/getCourseDuration';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LINK_BACK_TO_COURSES } from '../../constants';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCourses } from '../../store/courses/courses.selectors';
import { selectAuthors } from '../../store/authors/authors.selectors';

export const CourseInfo = () => {
	const { courseId } = useParams();
	const coursesList = useAppSelector(selectCourses);
	const authorsList = useAppSelector(selectAuthors);

	const [course, setCourse] = useState<TCourse>();

	useEffect(() => {
		const activeCourse = coursesList.filter(
			(courseItem) => courseItem.id === courseId
		);
		setCourse(activeCourse[0]);
	}, [courseId, coursesList]);

	return (
		<>
			{course && (
				<Box p={2} mb={2} border={2} borderColor='green'>
					<Box display='flex' flexDirection='column' alignItems='center'>
						<Link
							to='/courses'
							style={{
								alignSelf: 'flex-start',
								marginBottom: 3,
								textDecoration: 'none',
							}}
						>
							{`< ${LINK_BACK_TO_COURSES}`}
						</Link>

						<Typography variant='h5' fontWeight='bold' mb={8}>
							{course.title}
						</Typography>
					</Box>
					<Box display='flex' justifyContent='space-between'>
						<Box maxWidth='70%'>
							<Typography>{course.description}</Typography>
						</Box>
						<Box
							display='flex'
							flexDirection='column'
							maxWidth='25%'
							width='100%'
						>
							<Typography
								mb={1}
								whiteSpace='nowrap'
								overflow='hidden'
								maxWidth={250}
								textOverflow='ellipsis'
							>
								<Typography component='span' fontWeight='bold'>
									ID:
								</Typography>
								{` ${course.id}`}
							</Typography>
							<Typography mb={1}>
								<Typography component='span' fontWeight='bold'>
									Duration:
								</Typography>
								{` ${getCoursesDuration(course.duration)}`}
							</Typography>
							<Typography mb={1}>
								<Typography component='span' fontWeight='bold'>
									Created:
								</Typography>
								{` ${formatCreationDate(course.creationDate)}`}
							</Typography>
							<Typography component='span' fontWeight='bold' mb={1}>
								Authors:
							</Typography>

							{authorsList
								.filter(({ id }) => course.authors.includes(id))
								.map((author) => (
									<Typography key={author.id} component='p'>
										{author.name}
									</Typography>
								))}
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
};
