import moment from 'moment';
import { ReviewInterface } from '../../models/mediaModel';
import classes from './review.module.css';
import Rating from '../rating/Rating';

interface ReviewProps {
  review: ReviewInterface;
  viewFull: boolean;
}

const Review = ({ review, viewFull }: ReviewProps) => {
  const rating = !review.author_details.rating
    ? 'NR'
    : (review.author_details.rating * 10).toFixed(0);
  return (
    <div>
      <div className={classes.container}>
        <div
          className={`${classes.header} ${
            !viewFull ? classes['header--details'] : ''
          }`}
        >
          {viewFull && <Rating value={rating} size='small' />}
          <div>
            <h2>{review.author}</h2>
            <span>{moment(review.updated_at).format('MMM DD, YYYY')}</span>
          </div>
          {!viewFull && <Rating value={rating} size='small' />}
        </div>
        {viewFull && <p>{review.content}</p>}
      </div>
    </div>
  );
};

export default Review;
