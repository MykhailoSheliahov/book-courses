import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectUser = (state: RootState) => state.user;

export const selectUserIsAuth = createSelector(
	selectUser,
	(user): boolean => user.isAuth
);

export const selectUserName = createSelector(
	selectUser,
	(user): string => user.name
);

export const selectUserToken = createSelector(
	selectUser,
	(user): string => user.token
);

export const selectUserRole = createSelector(
	selectUser,
	(user): string => user.role
);

export const selectIsUserRoleAdmin = createSelector(
	selectUser,
	(user): boolean => user.role === 'admin'
);
