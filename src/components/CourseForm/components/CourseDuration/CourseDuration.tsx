import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Input } from '../../../../common/Input';

import {
	ADD_COURSE_DURATION_LABEL,
	INPUT_DURATION_TEXT,
} from '../../../../constants';
import { getCoursesDuration } from '../../../../helpers/getCourseDuration';

type TCourseDuration = {
	courseDuration: string;
	handleDurationChange: (value: string) => void;
};

export const CourseDuration = ({
	courseDuration,
	handleDurationChange,
}: TCourseDuration) => {
	const [value, setValue] = useState(courseDuration);

	useEffect(() => {
		setValue(courseDuration);
	}, [courseDuration]);
	return (
		<Box mb={2}>
			<Typography mb={2} fontWeight='bold' textAlign='center'>
				{ADD_COURSE_DURATION_LABEL}
			</Typography>
			<Box mb={2}>
				<Box display='flex' flexDirection='column'>
					<Input
						value={value}
						placeholder={INPUT_DURATION_TEXT}
						labelText={ADD_COURSE_DURATION_LABEL}
						handleChange={handleDurationChange}
						type='number'
					/>
					<Typography mt={2}>
						{ADD_COURSE_DURATION_LABEL}
						<Typography component='span' variant='h5' fontWeight='bold'>
							{` ${getCoursesDuration(Number(value))}`}
						</Typography>
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
