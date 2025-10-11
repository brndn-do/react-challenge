
import './CoursePlan.css';

interface Course {
  id: string;
  title: string;
  meets: string;
  term: string;
  number: string;
}

interface CoursePlanProps {
  selected: Course[];
  onClose: () => void;
}

const CoursePlan = ({ selected, onClose }: CoursePlanProps) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Course Plan</h2>
        {selected.length === 0 ? (
          <div>
            <p>No courses selected.</p>
            <p>To select a course, click on it in the course list.</p>
          </div>
        ) : (
          <ul>
            {selected.map((course) => (
              <li key={course.id}>
                {course.term} CS {course.number}: {course.title} ({course.meets})
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CoursePlan;
