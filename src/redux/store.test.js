import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import * as actions from './actions/courseActions';

describe('reduxStore', () => {
  it('store should include valid course when called a series of actions', () => {
    // arrange
    const store = createStore(rootReducer, initialState)
    const newCourses = [
      {
        id: 1,
        title: 'New Course 1'
      },
      {
        id: 2,
        title: 'New Course 2'
      },
      {
        id: 3,
        title: 'New Course 3'
      }
    ];
    const updatedCourse = {
      id: 2,
      title: 'Updated Course'
    };

    // act
    // create three courses
    newCourses.forEach((course) => {
      const createCoureAction = actions.createCourseSuccess(course);
      store.dispatch(createCoureAction);
    })
    // update one course in the store
    const updateCourseAction = actions.updateCourseSuccess(updatedCourse);
    store.dispatch(updateCourseAction);

    // assert
    const courses = store.getState().courses;
    const updatedCourseResult = courses.find(course => course.id === updatedCourse.id);
    const untouchedCourses = courses.filter(course => course.id !== updatedCourse.id);

    expect(courses.length).toBe(3);
    expect(updatedCourseResult).toEqual(updatedCourse);
    expect(untouchedCourses[0]).toEqual(newCourses[0]);
    expect(untouchedCourses[1]).toEqual(newCourses[2]);
  })
})