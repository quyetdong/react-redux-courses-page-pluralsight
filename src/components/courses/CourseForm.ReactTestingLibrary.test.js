import React from 'react';
import { cleanup, render } from 'react-testing-library';
import CourseForm from './CourseForm';

afterEach(cleanup);

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onChange: () => { },
    onSave: () => { },
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />)
}

// getByText is a method to find text we pass in the React component,
// if cannot find the text, it will fail
it('should render Add Course header', () => {
  const { getByText } = renderCourseForm();
  getByText('Add Course');
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText('Save');
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText, debug } = renderCourseForm({ saving: true});
  // debug();
  getByText('Saving...');
});