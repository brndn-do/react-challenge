import { useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: { [key: string]: Course };
}

const TermPage = ({ courses }: CourseListProps) => {
  const [selectedTerm, setSelectedTerm] = useState<string>('Fall');
  return (
    <>
      <TermSelector onSelectTerm={setSelectedTerm}/>
      <CourseList courses={courses} term={selectedTerm}/>
    </>
  );
};  

export default TermPage;
