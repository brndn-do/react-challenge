import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import type { Course } from '../utils/types';
import { courseSchema } from '../utils/types';
import { z } from 'zod';
import { db } from '../lib/firebase';
import { ref, set } from 'firebase/database';

type FormValues = z.infer<typeof courseSchema>;

interface CourseFormProps {
  courses: { [key: string]: Course };
}

const CourseForm = ({ courses }: CourseFormProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const initialCourse = id ? (courses[id] as unknown as FormValues) : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialCourse || { title: '', meets: '', term: 'Fall', number: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    // Prevent submitting when no id is available
    if (!id) {
      navigate('/');
      return;
    }

    // Do not submit if there are no changes
    const original = initialCourse || null;
    if (original && JSON.stringify(formData) === JSON.stringify(original)) {
      navigate('/');
      return;
    }

    try {
      // Write the course data under /courses/:id
      await set(ref(db, `courses/${id}`), formData);
      navigate('/');
    } catch (err) {
      console.error('Failed to save course:', err);
    }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Course Title:</label>
          <input
            type="text"
            id="title"
            {...register('title')}
          />
          {errors.title && <p className="error-message">{errors.title.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="term">Term:</label>
          <select id="term" {...register('term')}>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
          </select>
          {errors.term && <p className="error-message">{errors.term.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="number">Course Number:</label>
          <input
            type="text"
            id="number"
            {...register('number')}
          />
          {errors.number && <p className="error-message">{errors.number.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="meets">Meeting Times:</label>
          <input
            type="text"
            id="meets"
            {...register('meets')}
          />
          {errors.meets && <p className="error-message">{errors.meets.message}</p>}
        </div>
        <div className="form-actions">
          <button type="button" onClick={handleCancel}>Cancel</button>
          <button type="submit">Save Course</button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
