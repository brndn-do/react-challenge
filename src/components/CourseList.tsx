import { useCallback } from 'react';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: { [key: string]: Course };
  term: string;
  selected: string[];
  setSelected: (selected: string[]) => void;
}

const CourseList = ({ courses, term, selected, setSelected }: CourseListProps) => {
  const toggleSelected = useCallback((id: string) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id]
    );
  }, [selected, setSelected]);

  const filteredCourses = Object.entries(courses).filter(([, course]) => course.term === term);

  return (
    <ul>
      {filteredCourses.map(([id, course]) => {
        const isSelected = selected.includes(id);
        return (
          <li
            key={id}
            onClick={() => toggleSelected(id)}
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
