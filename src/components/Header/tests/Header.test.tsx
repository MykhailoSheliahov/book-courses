import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../helpers/renderWithProviders';
import { Header } from '../Header';
import * as selectIsUserRoleAdmin from './../../../store/user/user.selectors';
import * as showUserAuthInfo from '../../../helpers/showUserAuthInfo';
import { mockedStore } from '../../../mock';

const showUserAuthInfoSpy = jest.spyOn(showUserAuthInfo, 'showUserAuthInfo');
const selectUserNameSpy = jest.spyOn(selectIsUserRoleAdmin, 'selectUserName');
const selectUserIsAuthSpy = jest.spyOn(
	selectIsUserRoleAdmin,
	'selectUserIsAuth'
);

describe('<Header />', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should render user name', () => {
		showUserAuthInfoSpy.mockReturnValue(true);
		selectUserIsAuthSpy.mockReturnValue(true);
		selectUserNameSpy.mockReturnValue('username');

		renderWithProviders(<Header />, mockedStore);

		expect(screen.getByText(/username/i)).not.toBeInTheDocument();
	});

	it('should render logo', () => {
		renderWithProviders(<Header />, mockedStore);

		expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
	});
});
