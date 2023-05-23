import { ApiService } from '../../services';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TCourse, TSetCourse } from '../../types';

const initialState: TCourse[] = [];

export const updateCourse = createAsyncThunk(
	'courses/updateCourse',
	(course: TCourse): Promise<TCourse> => ApiService.updateCourse(course)
);

export const removeCourse = createAsyncThunk(
	'courses/removeCourse',
	(id: string): string => {
		ApiService.deleteCourse(id);
		return id;
	}
);

export const addCourse = createAsyncThunk(
	'courses/addCourse',
	(course: TSetCourse): Promise<TCourse> => ApiService.addCourse(course)
);

export const getCourses = createAsyncThunk(
	'courses/getCourses',
	(): Promise<TCourse[]> => ApiService.getCourses()
);

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				getCourses.fulfilled,
				(_state, action: PayloadAction<TCourse[]>) => action.payload
			)
			.addCase(removeCourse.fulfilled, (state, action: PayloadAction<string>) =>
				state.filter((item) => item.id !== action.payload)
			)
			.addCase(addCourse.fulfilled, (state, action: PayloadAction<TCourse>) => [
				...state,
				action.payload,
			])
			.addCase(
				updateCourse.fulfilled,
				(state, action: PayloadAction<TCourse>) =>
					state.map((item) => {
						if (item.id === action.payload.id) {
							return action.payload;
						}
						return item;
					})
			);
	},
});

export default coursesSlice.reducer;
