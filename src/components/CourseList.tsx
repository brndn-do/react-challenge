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
        return <li>{`${course.term} CS ${course.number}: ${course.title}`}</li>;
      })}
    </ul>
  );
};

export default CourseList;
