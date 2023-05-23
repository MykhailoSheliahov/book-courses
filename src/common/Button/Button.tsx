import { ButtonProps } from '@mui/material';
import { ButtonStyled } from './Button.styles';

type TButton = {
	buttonText: string;
};

export const Button = ({
	buttonText,
	onClick,
	children,
	...rest
}: ButtonProps & TButton) => (
	<ButtonStyled onClick={onClick} variant='outlined' {...rest}>
		{buttonText}
		{children}
	</ButtonStyled>
);
