import { TMockedState } from './types';
import { Store } from '@reduxjs/toolkit';

export const mockedState: TMockedState = {
	user: {
		isAuth: true,
		name: 'username',
		email: 'test@gmail.com',
		token: 'dsadsadsad1321',
		role: 'user',
	},
	courses: [
		{
			id: 'id-12345-6788',
			title: 'Javascript',
			description: 'Some description',
			authors: ['John', 'Steeve'],
			duration: 25,
			creationDate: '5/07/2022',
		},
	],
	authors: [
		{
			id: '1',
			name: 'Tim',
		},
		{
			id: '2',
			name: 'Justin',
		},
	],
};

export const mockedStore: Store<TMockedState> = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
	replaceReducer: jest.fn(),
	[Symbol.observable]: jest.fn(),
};
