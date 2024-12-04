import { Rating } from '@mui/material';
import classes from './RatingStar.module.css';
import { MdOutlineStarBorder, MdStar } from 'react-icons/md';

interface IRatingStar {
  value: number;
  size: 'small' | 'medium' | 'large';
  vote_count?: number;
  isSingleStar?: boolean;
}

function toOneDecimalWithoutRounding(num: number) {
  return Math.trunc(num * 10) / 10;
}
const RatingStar = ({ value, size, vote_count, isSingleStar }: IRatingStar) => {
  const formattedRating = toOneDecimalWithoutRounding(+(value / 2));
  let starSize = '2.2rem';

  if (size === 'medium') starSize = '2.4rem';
  if (size === 'large') starSize = '2.6rem';

  return (
    <div className={`${classes.container} ${classes[`container--${size}`]}`}>
      {!isSingleStar ? (
        <Rating
          value={formattedRating}
          readOnly
          sx={{ fontSize: starSize, color: '#f97316' }}
          precision={0.5}
          emptyIcon={<MdOutlineStarBorder style={{ color: '#FFFFFF' }} />}
        />
      ) : (
        <MdStar className={classes.star} />
      )}

      <p>
        {formattedRating === 0 ? 'NR' : formattedRating}
        {formattedRating > 0 &&
          vote_count &&
          ` (${vote_count?.toLocaleString()})`}
      </p>
    </div>
  );
};

export default RatingStar;
