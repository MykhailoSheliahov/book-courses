import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import authorsReducer from './authors/authorsSlice';
import coursesReducer from './courses/coursesSlice';

export const rootReducer = combineReducers({
	user: userReducer,
	authors: authorsReducer,
	courses: coursesReducer,
});
