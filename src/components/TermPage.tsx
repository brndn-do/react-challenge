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
  selected: string[];
  setSelected: (selected: string[]) => void;
  isAdmin?: boolean;
}

const TermPage = ({ courses, selected, setSelected, isAdmin }: CourseListProps) => {
  const [selectedTerm, setSelectedTerm] = useState<string>('Fall');
  return (
    <>
      <TermSelector onSelectTerm={setSelectedTerm}/>
      <CourseList courses={courses} term={selectedTerm} selected={selected} setSelected={setSelected} isAdmin={isAdmin} />
    </>
  );
};  

export default TermPage;
