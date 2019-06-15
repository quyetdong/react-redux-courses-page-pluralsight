import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

it('should add course when passed CREATE_COURSE_SUCCESS', () => {
  // arrange
  const initialState = [
    {
      title: 'A'
    },
    {
      title: 'B'
    }
  ];
  const newCourse = { title: 'C'}
  const createCourseAction = actions.createCourseSuccess(newCourse);

  // act
  const courses = courseReducer(initialState, createCourseAction);

  // assert
  expect(courses.length).toBe(3);
  expect(courses[0].title).toBe('A');
  expect(courses[1].title).toBe('B');
  expect(courses[2].title).toBe('C');
});

it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
  // arrange
  const initialState = [
    {
      id: 1,
      title: 'A'
    },
    {
      id: 2,
      title: 'B'
    },
    {
      id: 3,
      title: 'C'
    }
  ];
  const updatedCourse = { id: 2, title: 'D'}
  const updateCourseAction = actions.updateCourseSuccess(updatedCourse);

  // act
  const courses = courseReducer(initialState, updateCourseAction);

  // assert
  expect(courses.length).toBe(3);
  expect(courses[0].title).toBe('A');
  expect(courses[1].title).toBe('D');
  expect(courses[2].title).toBe('C');
});
