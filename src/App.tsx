import Banner from './components/Banner';
import './App.css';
import { useState, useEffect } from 'react';
import TermPage from './components/TermPage';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
        );
        if (!response.ok) {
          throw new Error(`ERROR: status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let bannerTitle = 'CS Courses';
  if (loading) bannerTitle = 'Loading...';
  else if (error) bannerTitle = `Error: ${error.message}`;
  else if (data) bannerTitle = data.title;

  return (
    <>
      <Banner title={bannerTitle} />
      <TermPage courses={data?.courses ?? {}}/>
    </>
  );
};

export default App;
