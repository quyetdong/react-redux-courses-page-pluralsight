import * as courseActions from './courseActions';
import types from './actionTypes';
import { courses } from '../../../tools/mockData';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

// test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('loadCourses thunk', () => {
    it('should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS actions', () => {
      fetchMock.mock('*', {
        body: courses,
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];
      const store = mockStore({ courses: [] })

      return store.dispatch(courseActions.loadCourses())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
    })
  })
})

describe('createCourseSuccess', () => {
  it('should create a CREATE_COURSE_SUCCESS action', () => {
    // arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS, course
    };

    // act
    const action = courseActions.createCourseSuccess(course);

    // assert
    expect(action).toEqual(expectedAction);
  })
});
