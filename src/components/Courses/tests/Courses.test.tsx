import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../../helpers/renderWithProviders';
import { Courses } from '../Courses';

import * as selectIsUserRoleAdmin from './../../../store/user/user.selectors';
import * as selectCourses from './../../../store/courses/courses.selectors';
import * as formatCreationDate from './../../../helpers/formatCreationDate';
import { mockedStore, mockedState } from '../../../mock';

jest.spyOn(formatCreationDate, 'formatCreationDate');
const selectCoursesSpy = jest.spyOn(selectCourses, 'selectCourses');
const selectIsUserRoleAdminSpy = jest.spyOn(
	selectIsUserRoleAdmin,
	'selectIsUserRoleAdmin'
);

describe('<Courses />', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should display amount of CourseCard equal length of courses array', async () => {
		selectCoursesSpy.mockReturnValue([mockedState.courses[0]]);

		const { store } = renderWithProviders(<Courses />, mockedStore);

		const state = store.getState();
		expect(state.courses.length).toEqual(mockedState.courses.length);
	});

	it(' should render CourseForm after a click on the "Add new course" button', () => {
		selectCoursesSpy.mockReturnValue([mockedState.courses[0]]);
		selectIsUserRoleAdminSpy.mockReturnValue(true);

		renderWithProviders(<Courses />, mockedStore);

		fireEvent.click(screen.getByText(/add new course/i));
		expect(window.location.pathname).toBe('/courses/add');
	});
});
