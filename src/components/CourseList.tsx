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
  const filteredCourses = Object.values(courses).filter((c) => c.term === term);
  return (
    <ul>
      {filteredCourses.map((course) => {
        return (
          <li key={course.number}>
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
