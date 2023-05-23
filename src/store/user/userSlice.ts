import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiService } from '../../services';
import {
	TUserState,
	TLoginCredentials,
	TRegistrationCredentials,
} from '../../types';

const initialState: TUserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};
export const getUserData = createAsyncThunk(
	'user/getUserData',
	async (): Promise<TUserState> => {
		const token = localStorage.getItem('userToken')!;
		const res = await ApiService.getLoggedUser();
		return {
			isAuth: res.successful,
			name: res.result.name,
			email: res.result.email,
			role: res.result.role,
			token,
		};
	}
);

export const userLogout = createAsyncThunk(
	'user/userLogout',
	(): Promise<void> => ApiService.logout()
);

export const userLogin = createAsyncThunk(
	'user/userLogin',
	async (params: TLoginCredentials): Promise<TUserState> => {
		const res = await ApiService.login(params);
		return {
			isAuth: res.successful,
			name: res.user.name,
			email: res.user.email,
			role: '',
			token: res.result,
		};
	}
);

export const userRegistration = createAsyncThunk(
	'user/userRegistration',
	(params: TRegistrationCredentials): Promise<void> =>
		ApiService.registration(params)
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				getUserData.fulfilled,
				(_, action: PayloadAction<TUserState>) => action.payload
			)
			.addCase(userLogout.fulfilled, () => initialState)
			.addCase(
				userLogin.fulfilled,
				(_, action: PayloadAction<TUserState>) => action.payload
			);
	},
});

export default userSlice.reducer;
