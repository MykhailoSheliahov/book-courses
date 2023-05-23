import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiService } from '../../services';

import { TAuthor } from '../../types';

const initialState: TAuthor[] = [];

export const addAuthor = createAsyncThunk(
	'authors/addAuthor',
	(newAuthorName: string): Promise<TAuthor> =>
		ApiService.addAuthor(newAuthorName)
);

export const getAuthors = createAsyncThunk(
	'authors/setAuthors',
	(): Promise<TAuthor[]> => ApiService.getAuthors()
);

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addAuthor.fulfilled, (state, action: PayloadAction<TAuthor>) => [
				...state,
				action.payload,
			])
			.addCase(
				getAuthors.fulfilled,
				(_, action: PayloadAction<TAuthor[]>) => action.payload
			);
	},
});

export default authorsSlice.reducer;
