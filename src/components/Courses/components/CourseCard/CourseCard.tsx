import { Edit, DeleteOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../common/Button';
import { BUTTON_SHOW_COURSE_TEXT } from '../../../../constants';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { getCoursesDuration } from '../../../../helpers/getCourseDuration';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { removeCourse } from '../../../../store/courses/coursesSlice';
import { selectIsUserRoleAdmin } from '../../../../store/user/user.selectors';

type TCourseCard = {
	title: string;
	description: string;
	authors: string[];
	duration: number;
	creationDate: string;
	id: string;
};

export const CourseCard = ({
	id,
	title,
	description,
	authors,
	duration,
	creationDate,
}: TCourseCard) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	let isAdmin = useAppSelector(selectIsUserRoleAdmin);

	const handleRemoveCourse = () => {
		dispatch(removeCourse(id));
	};

	return (
		<Box
			p={2}
			mb={2}
			border={2}
			borderColor='green'
			display='flex'
			justifyContent='space-between'
		>
			<Box maxWidth='70%'>
				<Typography variant='h5' fontWeight='bold' mb={2}>
					{title}
				</Typography>
				<Typography>{description}</Typography>
			</Box>
			<Box display='flex' flexDirection='column' maxWidth='25%' width='100%'>
				<Typography
					mb={1}
					whiteSpace='nowrap'
					overflow='hidden'
					maxWidth={250}
					textOverflow='ellipsis'
				>
					<Typography component='span' fontWeight='bold'>
						Author:
					</Typography>
					{` ${authors?.join(', ')}`}
				</Typography>
				<Typography mb={1}>
					<Typography component='span' fontWeight='bold'>
						Duration:
					</Typography>
					{` ${getCoursesDuration(duration)}`}
				</Typography>
				<Typography mb={1}>
					<Typography component='span' fontWeight='bold'>
						Created:
					</Typography>
					{` ${formatCreationDate(creationDate)}`}
				</Typography>
				<Box alignSelf='center' display='flex'>
					<Button
						onClick={() => navigate(`/courses/${id}`)}
						buttonText={BUTTON_SHOW_COURSE_TEXT}
					/>
					{isAdmin && (
						<>
							<Button
								onClick={() => navigate(`/courses/update/${id}`)}
								buttonText=''
							>
								<Edit />
							</Button>
							<Button onClick={handleRemoveCourse} buttonText=''>
								<DeleteOutlined />
							</Button>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
};
