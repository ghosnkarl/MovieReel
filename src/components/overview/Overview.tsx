import classes from "./overview.module.css";

const Overview = ({
  tagline,
  overview,
}: {
  tagline: string;
  overview: string;
}) => {
  return (
    <div>
      <p className={classes.overview}>{overview}</p>
    </div>
  );
};

export default Overview;
