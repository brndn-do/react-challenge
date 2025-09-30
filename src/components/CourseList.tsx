interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: { [key: string]: Course };
}

const CourseList = ({ courses }: CourseListProps) => {
  return (
    <ul>
      {Object.values(courses).map((course) => {
        return (
          <li>
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
