import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

function ManageCoursePage({
  loadAuthors,
  loadCourses,
  courses,
  authors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert('Loading courses failed' + error);
      });
    } else {
      setCourse({
        ...props.course
      })
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert('Loading courses failed' + error);
      });
    }
  }, [props.course])

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success('Course saved.');
        history.push('/courses');
      })
      .catch(error => alert('Saving course failed ' + error));
  }

  return (
    (courses.length === 0 || authors.length === 0) ? <Spinner /> :
      <CourseForm
        course={course}
        authors={authors}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
  )
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function getCourseBySlug(courses, slug) {
  return courses.find(course => slug === course.slug) || null;
}

function mapStateToProps(state, ownProps) {
  const { slug } = ownProps.match.params;
  const course = (slug && state.courses.length > 0)
    ? getCourseBySlug(state.courses, slug)
    : newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors,
  }
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
