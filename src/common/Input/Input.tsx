import React from 'react';
import { Box } from '@mui/material';

import { InputStyled } from './Input.styles';

type TInput = {
	placeholder: string;
	labelText?: string;
	value: string;
	type?: string;
	handleChange: (value: string) => void;
};

export const Input = ({
	placeholder,
	labelText,
	handleChange,
	value,
	type = 'text',
}: TInput) => (
	<>
		{labelText && (
			<Box mb={1}>
				<label htmlFor={labelText}>{labelText}</label>
			</Box>
		)}
		<InputStyled
			value={value}
			id={labelText}
			color='warning'
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				handleChange(e.target.value);
			}}
			type={type}
			placeholder={placeholder}
		/>
	</>
);
