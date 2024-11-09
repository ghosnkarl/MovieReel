import { Rating } from '@mui/material';
import classes from '../../styles/rating-star.module.css';
import { MdOutlineStarBorder } from 'react-icons/md';

const RatingStar = ({
  value,
  size,
}: {
  value: number;
  size: 'small' | 'medium';
}) => {
  const formattedRating = +(value / 2).toFixed(1);
  const starSize = size === 'small' ? '2.2rem' : '2.8rem';
  return (
    <div className={`${classes.container} ${classes[`container--${size}`]}`}>
      <Rating
        value={formattedRating}
        readOnly
        sx={{ fontSize: starSize, color: '#f97316' }}
        precision={0.5}
        emptyIcon={<MdOutlineStarBorder style={{ color: '#ececec' }} />}
      />
      <p>{formattedRating === 0 ? 'NR' : formattedRating}</p>
    </div>
  );
};

export default RatingStar;
