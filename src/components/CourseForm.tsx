import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Course } from '../utils/types';

interface CourseFormProps {
  courses: { [key: string]: Course };
}

const CourseForm = ({ courses }: CourseFormProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const initialCourse = id ? courses[id] : null;

  const [title, setTitle] = useState(initialCourse?.title || '');
  const [meets, setMeets] = useState(initialCourse?.meets || '');

  useEffect(() => {
    if (id && !initialCourse) {
      // If course ID is in URL but course data not found, navigate back
      navigate('/');
    }
  }, [id, initialCourse, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No submission logic for now, as per instructions
    console.log('Form submitted (no action taken)');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!initialCourse && id) {
    return <div>Loading course data or course not found...</div>;
  }

  return (
    <div className="course-form-container">
      <h2>Edit Course: {initialCourse?.term} CS {initialCourse?.number}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Course Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="meets">Meeting Times:</label>
          <input
            type="text"
            id="meets"
            value={meets}
            onChange={(e) => setMeets(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={handleCancel}>Cancel</button>
          {/* No submit button as per instructions */}
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
