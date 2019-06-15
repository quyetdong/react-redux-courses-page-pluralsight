const actionTypes = {
  CREATE_COURSE: 'CREATE_COURSE',
  CREATE_COURSE_SUCCESS: 'CREATE_COURSE_SUCCESS',
  UPDATE_COURSE_SUCCESS: 'UPDATE_COURSE_SUCCESS',
  LOAD_COURSES_SUCCESS: 'LOAD_COURSES_SUCCESS',
  LOAD_AUTHORS_SUCCESS: 'LOAD_AUTHORS_SUCCESS',
  BEGIN_API_CALL: 'BEGIN_API_CALL',
  API_CALL_ERROR: 'API_CALL_ERROR',
  DELETE_COURSE_OPTIMISTIC: 'DELETE_COURSE_OPTIMISTIC',
};

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInprogress counter would be decremented below zero
// because we're not incrementing the number of apiCallsInprogress when the delete request begins.

export default actionTypes;
