import {
	TLoginCredentials,
	TRegistrationCredentials,
	TAuthor,
	TCourse,
	TSetCourse,
	TLoggedUserData,
	TLoginUserData,
} from './types';
import { AxiosRequest } from './helpers/AxiosRequest';
import {
	API_SERVICE_LOGIN,
	API_SERVICE_REGISTER,
	API_SERVICE_USER_ME,
	API_SERVICE_AUTHORS_ALL,
	API_SERVICE_COURSES_ALL,
	API_SERVICE_LOGOUT,
	API_SERVICE_DELETE_COURSE,
	API_SERVICE_COURSES_ADD,
	API_SERVICE_AUTHORS_ADD,
	API_SERVICE_COURSES_UPDATE,
} from './constants';
import { handleApiError } from './helpers/handleApiError';

export const ApiService = {
	async login(params: TLoginCredentials): Promise<TLoginUserData> {
		try {
			return await AxiosRequest(API_SERVICE_LOGIN, 'post', {
				data: params,
			});
		} catch (error) {
			return handleApiError(error);
		}
	},
	async logout(): Promise<void> {
		try {
			const token = localStorage.getItem('userToken')!;
			return AxiosRequest(API_SERVICE_LOGOUT, 'delete', {
				headers: {
					Authorization: token || '',
				},
			});
		} catch (error) {
			return handleApiError(error);
		}
	},
	async registration(params: TRegistrationCredentials): Promise<void> {
		try {
			return await AxiosRequest(API_SERVICE_REGISTER, 'post', { data: params });
		} catch (error) {
			return handleApiError(error);
		}
	},
	async getLoggedUser(): Promise<TLoggedUserData> {
		try {
			const token = localStorage.getItem('userToken');
			return AxiosRequest(API_SERVICE_USER_ME, 'get', {
				headers: {
					Authorization: token || '',
				},
			});
		} catch (error) {
			return handleApiError(error);
		}
	},
	async getAuthors(): Promise<TAuthor[]> {
		try {
			const res = await AxiosRequest(API_SERVICE_AUTHORS_ALL, 'get');
			return res.result;
		} catch (error) {
			return handleApiError(error);
		}
	},
	async getCourses(): Promise<TCourse[]> {
		try {
			const res = await AxiosRequest(API_SERVICE_COURSES_ALL, 'get');
			return res.result;
		} catch (error) {
			return handleApiError(error);
		}
	},
	async deleteCourse(id: string): Promise<TCourse> {
		try {
			const token = localStorage.getItem('userToken');
			return AxiosRequest(`${API_SERVICE_DELETE_COURSE}${id}`, 'delete', {
				headers: {
					Authorization: token || '',
				},
			});
		} catch (error) {
			return handleApiError(error);
		}
	},
	async addCourse(params: TSetCourse): Promise<TCourse> {
		try {
			const token = localStorage.getItem('userToken');
			const res = await AxiosRequest(API_SERVICE_COURSES_ADD, 'post', {
				headers: {
					Authorization: token || '',
				},
				data: {
					title: params.title,
					description: params.description,
					duration: Number(params.duration),
					authors: params.authors,
				},
			});
			return res.result;
		} catch (error) {
			return handleApiError(error);
		}
	},
	async addAuthor(name: string): Promise<TAuthor> {
		try {
			const token = localStorage.getItem('userToken');
			const res = await AxiosRequest(API_SERVICE_AUTHORS_ADD, 'post', {
				headers: {
					Authorization: token || '',
				},
				data: {
					name,
				},
			});
			return res.result;
		} catch (error) {
			return handleApiError(error);
		}
	},
	async updateCourse(course: TCourse): Promise<TCourse> {
		try {
			const token = localStorage.getItem('userToken');
			const res = await AxiosRequest(
				`${API_SERVICE_COURSES_UPDATE}${course.id}`,
				'put',
				{
					headers: {
						Authorization: token || '',
					},
					data: {
						title: course.title,
						description: course.description,
						duration: Number(course.duration),
						authors: course.authors,
					},
				}
			);
			return res.result;
		} catch (error) {
			return handleApiError(error);
		}
	},
};
