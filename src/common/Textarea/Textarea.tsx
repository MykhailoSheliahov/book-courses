import React from 'react';
import { Box } from '@mui/material';

import { TextareaStyled } from './Textarea.styles';

type TInput = {
	placeholder: string;
	labelText?: string;
	handleChange: (value: string) => void;
	value: string;
};

export const Textarea = ({
	placeholder,
	labelText,
	handleChange,
	value,
}: TInput) => (
	<>
		{labelText && (
			<Box mb={1}>
				<label htmlFor={labelText}>{labelText}</label>
			</Box>
		)}
		<TextareaStyled
			value={value}
			id={labelText}
			color='warning'
			rows={9}
			onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
				handleChange(e.target.value);
			}}
			placeholder={placeholder}
		/>
	</>
);
