import { createRef, useEffect } from 'react';
import classes from '../../styles/rating.module.css';

interface RatingProps {
  value: string;
  size: 'small' | 'medium';
}

const Rating = ({ value, size }: RatingProps) => {
  const ref = createRef<HTMLDivElement>();
  let ratingColorStyle = '';

  if (+value > 0 && +value < 40) {
    ratingColorStyle = classes['rating--red'];
  } else if (+value >= 40 && +value < 60) {
    ratingColorStyle = classes['rating--amber'];
  } else if (+value >= 60) {
    ratingColorStyle = classes['rating--green'];
  }

  const sizeStyle =
    size === 'small' ? classes['rating--small'] : classes['rating--medium'];

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.setProperty('--progress', value + '%');
    ref.current.setAttribute('data-value', +value === 0 ? 'NR' : value);
  });
  return (
    <div
      ref={ref}
      className={`${sizeStyle} ${classes.rating} ${ratingColorStyle}`}
      data-value={value}
    />
  );
};

export default Rating;
