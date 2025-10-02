import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import "./App.css";
import { useEffect, useState } from "react";

const COURSES_URL =
  "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

const App = () => {
  const [result, setResult] = useState({ title: "Courses", courses: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCourses = async () => {
      try {
        const res = await fetch(COURSES_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setResult(data);
      } catch (err) {
        // Abort throws a DOMException with name === "AbortError" in browsers
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        if (err instanceof Error) {
          setError(err);
        } else {
          // non-Error thrown (string, object, etc.) — normalize to Error
          setError(new Error(String(err)));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    return () => controller.abort();
  }, []);

  return loading ? (
    <>
      <Banner title="Loading courses…" />
      <div style={{ padding: 16 }}>Loading courses…</div>
    </>
  ) : error ? (
    <>
      <Banner title="Error loading courses" />
      <div style={{ padding: 16, color: "crimson" }}>
        Could not load courses: {error.message}
      </div>
      <CourseList courses={result.courses} />
    </>
  ) : (
    <>
      <Banner title={result.title} />
      <CourseList courses={result.courses} />
    </>
  );
};

export default App;
