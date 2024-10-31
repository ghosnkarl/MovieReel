import moment from 'moment';
import { ReviewInterface } from '../../models/mediaModel';
import classes from './review.module.css';
import Rating from '../rating/Rating';

interface ReviewProps {
  review: ReviewInterface;
  viewFull: boolean;
}

const Review = ({ review, viewFull }: ReviewProps) => {
  const { rating } = review.author_details;

  return (
    <div>
      <div className={classes.container}>
        <div
          className={`${classes.header} ${
            !viewFull ? classes['header--details'] : ''
          }`}
        >
          {rating && viewFull && (
            <Rating value={(rating * 10).toFixed(0)} size='small' />
          )}
          <div>
            <h2>{review.author}</h2>
            <span>{moment(review.updated_at).format('MMM DD, YYYY')}</span>
          </div>
          {rating && !viewFull && (
            <Rating value={(rating * 10).toFixed(0)} size='small' />
          )}
        </div>
        {viewFull && <p>{review.content}</p>}
      </div>
    </div>
  );
};

export default Review;
