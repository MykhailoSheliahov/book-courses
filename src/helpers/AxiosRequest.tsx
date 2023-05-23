import axios, { Method, AxiosRequestConfig } from 'axios';

export const AxiosRequest = async (
	endpoint: string,
	method: Method,
	config?: AxiosRequestConfig
) => {
	const response = await axios({
		baseURL: process.env.REACT_APP_API_HOST,
		url: endpoint,
		method,
		...config,
	} as AxiosRequestConfig);
	return response.data;
};
