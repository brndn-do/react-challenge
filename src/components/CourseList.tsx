import { useCallback, useState } from 'react';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: { [key: string]: Course };
  term: string;
}

const CourseList = ({ courses, term }: CourseListProps) => {
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(
    new Set()
  );

  const toggleSelected = useCallback((courseNumber: string) => {
    setSelectedCourses((prev) => {
      const next = new Set(prev); // create new Set to change reference
      if (next.has(courseNumber)) next.delete(courseNumber);
      else next.add(courseNumber);
      return next;
    });
  }, []);

  const filteredCourses = Object.values(courses).filter((c) => c.term === term);

  return (
    <ul>
      {filteredCourses.map((course) => {
        const isSelected = selectedCourses.has(course.number);
        return (
          <li
            key={course.number}
            onClick={() => toggleSelected(course.number)}
            className={`course-item ${isSelected ? 'selected' : ''}`}
          >
            <h6 className="term-number">{`${course.term} CS ${course.number}`}</h6>
            <p className="title">{`${course.title}`}</p>
            <p className="meets">{`${course.meets}`}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default CourseList;
