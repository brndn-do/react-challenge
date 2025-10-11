interface BannerProps {
  title: string;
  onCoursePlanClick: () => void;
}

const Banner = ({title, onCoursePlanClick}: BannerProps) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h1>{title}</h1>
      <button onClick={onCoursePlanClick}>Course Plan</button>
    </div>
  )
};

export default Banner;