import { AxiosError } from 'axios';

export const handleApiError = (error: unknown) => {
	let errorMessage: any = 'Failed to do something exceptional';
	if (error instanceof Error) {
		errorMessage = error.message;
		throw Error(errorMessage);
	}
	if (error instanceof AxiosError) {
		if (error.response!.data.result) {
			errorMessage = [error.response!.data.result];
			throw Error(errorMessage);
		} else {
			errorMessage = error.response!.data.errors;
			throw Error(errorMessage);
		}
	}
	throw Error;
};
