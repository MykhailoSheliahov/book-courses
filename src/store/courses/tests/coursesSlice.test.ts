import '@testing-library/jest-dom';

import * as modActions from '../coursesSlice';
import { setupStore } from '../../store';
import { ApiService } from '../../../services';

const ApiServiceGetCoursesSpy = jest.spyOn(ApiService, 'getCourses');
const ApiServiceAddCourseSpy = jest.spyOn(ApiService, 'addCourse');

const store = setupStore();

describe('coursesSlice', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should return the initial state', async () => {
		const courses = [
			{
				id: '1',
				title: 'Js',
				description: 'Some description',
				creationDate: '10.01.2022',
				duration: 10,
				authors: ['Masha', 'Tim'],
			},
		];
		ApiServiceGetCoursesSpy.mockResolvedValue(courses);

		await store.dispatch(modActions.getCourses());
		expect(ApiServiceGetCoursesSpy).toHaveBeenCalledTimes(1);

		const state = store.getState();
		expect(state.courses).toEqual(courses);
	});

	it('should handle SAVE_COURSE and returns new state.', async () => {
		const newCourse = {
			id: '2',
			title: 'Node.js',
			description: 'Some description',
			creationDate: '13.12.2022',
			duration: 1,
			authors: ['Mike', 'Nina'],
		};
		ApiServiceAddCourseSpy.mockResolvedValue(newCourse);

		const state = store.getState();
		expect(state.courses).toHaveLength(1);

		await store.dispatch(modActions.addCourse(newCourse));
		expect(ApiServiceAddCourseSpy).toHaveBeenCalledTimes(1);

		const updatedState = store.getState();
		expect(updatedState.courses).toHaveLength(2);
	});
});
