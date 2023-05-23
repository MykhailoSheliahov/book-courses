import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';

export const renderWithProviders = (component: ReactElement, store: Store) => {
	return {
		...render(
			<Provider store={store}>
				<BrowserRouter>{component}</BrowserRouter>
			</Provider>
		),
		store,
	};
};
