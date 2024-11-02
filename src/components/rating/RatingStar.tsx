import { IoMdStar } from 'react-icons/io';
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
    <div className={`${classes.container} ${classes[`container--${size}`]}`}>
      <span>
        <IoMdStar />
      </span>
      <p>{rating}</p>
    </div>
  );
};

export default RatingStar;
