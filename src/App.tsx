import Banner from './components/Banner';
import './App.css';
import { useState, useEffect } from 'react';
import { ref, onValue, off, DataSnapshot } from 'firebase/database';
import TermPage from './components/TermPage';
import CoursePlan from './components/CoursePlan';
import CourseForm from './components/CourseForm'; // Import CourseForm
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import routing components
import { db } from './lib/firebase';

interface CourseData {
  title: string;
  courses: {
    [key: string]: {
      term: string;
      number: string;
      meets: string;
      title: string;
    };
  };
}

const App = () => {
  const [data, setData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showCoursePlan, setShowCoursePlan] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const dataRef = ref(db, '/');

  const handleValue = (snapshot: DataSnapshot) => {
      try {
        const val = snapshot.val();
        if (val == null) {
          setError(new Error('No data available'));
        } else {
          setData(val as CourseData);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    onValue(dataRef, handleValue, (err) => {
      setError(err as Error);
      setLoading(false);
    });

    return () => {
      off(dataRef, 'value', handleValue);
    };
  }, []);

  let bannerTitle = 'CS Courses';
  if (loading) bannerTitle = 'Loading...';
  else if (error) bannerTitle = `Error: ${error.message}`;
  else if (data) bannerTitle = data.title;

  const toggleCoursePlan = () => setShowCoursePlan(!showCoursePlan);

  const selectedCourses = Object.entries(data?.courses ?? {})
    .filter(([id]) => selected.includes(id))
    .map(([id, course]) => ({ ...course, id }));

  return (
    <BrowserRouter>
      <Banner title={bannerTitle} onCoursePlanClick={toggleCoursePlan} />
      <Routes>
        <Route path="/" element={
          <>
            <TermPage courses={data?.courses ?? {}} selected={selected} setSelected={setSelected} />
            {showCoursePlan && <CoursePlan selected={selectedCourses} onClose={toggleCoursePlan} />}
          </>
        } />
        <Route path="/edit/:id" element={<CourseForm courses={data?.courses ?? {}} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
