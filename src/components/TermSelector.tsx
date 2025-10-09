interface TermSelectorProps {
  onSelectTerm: (term: string) => void;
}

const TermSelector = ({onSelectTerm}: TermSelectorProps) => {
  const terms = ['Fall', 'Winter', 'Spring'];
  return (
    <div className='buttons'>
      {terms.map((term) => (
        <button key={term} onClick={() => onSelectTerm(term)}>{term}</button>
      ))}
    </div>
  );
};

export default TermSelector;
