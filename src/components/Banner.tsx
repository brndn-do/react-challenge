interface BannerProps {
  title: string;
}

const Banner = ({title}: BannerProps) => {
  return (
    <h1>{title}</h1>
  )
};

export default Banner;