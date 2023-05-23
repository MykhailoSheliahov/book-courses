import { Box, Typography } from '@mui/material';

import { Button } from '../../../../common/Button';

type TAuthorItem = {
	id: string;
	authorName: string;
	buttonText: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AuthorItem = ({
	authorName,
	buttonText,
	onClick,
	id,
}: TAuthorItem) => {
	return (
		<Box display='flex' justifyContent='space-between' alignItems='center'>
			<Typography>{authorName}</Typography>
			<Button id={id} onClick={onClick} buttonText={buttonText} />
		</Box>
	);
};
