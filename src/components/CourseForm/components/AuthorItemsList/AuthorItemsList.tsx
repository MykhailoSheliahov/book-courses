import { Box, Typography } from '@mui/material';
import { AuthorItem } from '../AuthorItem';
import { TAuthor } from '../../../../types';

type TAuthorItemsList = {
	authorsList: TAuthor[];
	title: string;
	emptyListText: string;
	buttonText: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AuthorItemsList = ({
	authorsList,
	title,
	emptyListText,
	buttonText,
	onClick,
}: TAuthorItemsList) => {
	return (
		<Box mb={2}>
			<Typography mb={2} fontWeight='bold' textAlign='center'>
				{title}
			</Typography>
			<Box
				sx={{
					px: 2,
					'& > *': {
						mb: 1,
					},
				}}
			>
				{authorsList.length ? (
					authorsList.map(({ name, id }) => (
						<AuthorItem
							key={id}
							id={id}
							onClick={onClick}
							authorName={name}
							buttonText={buttonText}
						/>
					))
				) : (
					<Typography textAlign='center'>{emptyListText} </Typography>
				)}
			</Box>
		</Box>
	);
};
