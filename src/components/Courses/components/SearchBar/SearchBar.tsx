import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { Button } from '../../../../common/Button';
import { Input } from '../../../../common/Input';
import {
	BUTTON_SEARCH_BAR_TEXT,
	INPUT_SEARCH_BAR_TEXT,
} from '../../../../constants';

type TSearchBar = {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	searchSubmit: (searchTerm: string) => void;
};

export const SearchBar = ({
	searchTerm,
	setSearchTerm,
	searchSubmit,
}: TSearchBar) => {
	useEffect(() => {
		if (!searchTerm) {
			searchSubmit(searchTerm);
		}
	}, [searchSubmit, searchTerm]);

	return (
		<Box height='40' width='50%'>
			<form
				style={{ display: 'flex' }}
				onSubmit={(e) => {
					e.preventDefault();
					searchSubmit(searchTerm);
				}}
			>
				<Input
					handleChange={setSearchTerm}
					value={searchTerm}
					placeholder={INPUT_SEARCH_BAR_TEXT}
				/>
				<Box ml={2} component='span'>
					<Button
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
							e.preventDefault();
							searchSubmit(searchTerm);
						}}
						type='submit'
						buttonText={BUTTON_SEARCH_BAR_TEXT}
					/>
				</Box>
			</form>
		</Box>
	);
};
