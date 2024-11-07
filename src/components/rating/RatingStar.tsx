import classes from '../../styles/rating-star.module.css';

const RatingStar = ({
  value,
  size,
}: {
  value: number;
  size: 'small' | 'medium';
}) => {
  const rating = value === 0 ? 'NR' : value.toFixed(1);
  return (
    <p className={`${classes.container} ${classes[`container--${size}`]}`}>
      {rating}
    </p>
  );
};

export default RatingStar;
