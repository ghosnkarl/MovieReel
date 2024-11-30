import classes from './ReviewItem.module.css';
import Rating from '../../rating/Rating';
import { IReview } from '../../../models/commonModel';
import { formatDate } from '../../../helpers/dateFormatter';

interface ReviewProps {
  review: IReview;
  viewFull: boolean;
}

const ReviewItem = ({ review, viewFull }: ReviewProps) => {
  const { rating } = review.author_details;

  return (
    <div>
      <div
        className={`${classes.container} ${
          viewFull ? classes['container--full'] : ''
        }`}
      >
        <div className={classes.header}>
          {rating && <Rating value={(rating * 10).toFixed(0)} size='small' />}
          <div>
            <h2>{review.author}</h2>
            <span>{formatDate(review.updated_at)}</span>
          </div>
        </div>
        <p className={!viewFull ? classes['max--lines'] : ''}>
          {review.content}
        </p>
      </div>
    </div>
  );
};

export default ReviewItem;
