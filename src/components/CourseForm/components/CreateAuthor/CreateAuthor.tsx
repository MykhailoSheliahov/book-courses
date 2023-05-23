import { Box, Typography } from '@mui/material';
import { Button } from '../../../../common/Button';
import { Input } from '../../../../common/Input';

import {
	ADD_COURSE_ADD_AUTHOR_LABEL,
	INPUT_ADD_AUTHOR_TEXT,
	ADD_COURSE_ADD_AUTHOR_TITLE,
	BUTTON_CREATE_AUTHOR_LABEL,
} from '../../../../constants';

type TCourseDuration = {
	authorName: string;
	setAuthorName: (value: string) => void;
	handleCreateAuthor: () => void;
};

export const CreateAuthor = ({
	authorName,
	setAuthorName,
	handleCreateAuthor,
}: TCourseDuration) => {
	return (
		<Box mb={4}>
			<Typography mb={2} fontWeight='bold' textAlign='center'>
				{ADD_COURSE_ADD_AUTHOR_LABEL}
			</Typography>
			<Box mb={2}>
				<Box display='flex' flexDirection='column'>
					<Input
						placeholder={INPUT_ADD_AUTHOR_TEXT}
						labelText={ADD_COURSE_ADD_AUTHOR_TITLE}
						handleChange={setAuthorName}
						value={authorName}
					/>
					<Box mt={2} alignSelf='center'>
						<Button
							onClick={handleCreateAuthor}
							buttonText={BUTTON_CREATE_AUTHOR_LABEL}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
