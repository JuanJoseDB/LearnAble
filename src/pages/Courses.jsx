import React from 'react';
import { useRole } from '../context/RoleContext.jsx';
import { courses } from '../data/courses.js';
import CourseCard from '../components/CourseCard.jsx';

export default function Courses() {
  const { role } = useRole();

  return (
    <section className="container">
      <h2>Courses {role ? `— ${role === 'teacher' ? 'Teacher' : 'Learner'} view` : ''}</h2>
      <div className="grid" role="list">
        {courses.map(c => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </section>
  );
}
