import classes from './Rating.module.css';

const Rating = ({ rating }: { rating: number | null }) => {
  return <p className={classes.rating}>{rating ? rating.toFixed(1) : 'N/A'}</p>;
};

export default Rating;
