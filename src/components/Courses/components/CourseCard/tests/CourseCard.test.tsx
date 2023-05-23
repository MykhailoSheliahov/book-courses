import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../../../helpers/renderWithProviders';
import { CourseCard } from '../CourseCard';
import * as formatCreationDate from './../../../../../helpers/formatCreationDate';
import { mockedStore, mockedState } from '../../../../../mock';

const formatCreationDateSpy = jest.spyOn(
	formatCreationDate,
	'formatCreationDate'
);

describe('<CourseCard />', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should return title, description, authors, duration and creation date', () => {
		formatCreationDateSpy.mockReturnValue('05.07.2022');

		renderWithProviders(
			<CourseCard {...mockedState.courses[0]} />,
			mockedStore
		);

		expect(screen.getByText(/javascript/i)).toBeInTheDocument();
		expect(screen.getByText(/some description/i)).toBeInTheDocument();
		expect(screen.getByText(/john, steeve/i)).toBeInTheDocument();
		expect(screen.getByText(/25/i)).toBeInTheDocument();
		expect(screen.getByText(/05.07.2022/i)).toBeInTheDocument();
	});
});
