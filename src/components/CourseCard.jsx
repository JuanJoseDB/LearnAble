import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <article className="card" aria-labelledby={`course-${course.id}-title`}>
      <h3 id={`course-${course.id}-title`}>{course.title}</h3>
      <p>{course.short}</p>
      <Link className="btn" to={`/course/${course.id}`}>Open course</Link>
    </article>
  );
}
