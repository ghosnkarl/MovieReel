import { IReview } from '../../../models/commonModel';
import classes from './ReviewsList.module.css';
import Rating from '../../rating/Rating';
import { formatDate } from '../../../helpers/commonHelpers';
import EmptyResource from '../../ui/empty_resource/EmptyResource';

interface IReviewItem {
  review: IReview;
}

const ReviewItem = ({ review }: IReviewItem) => {
  const { rating } = review.author_details;

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.header}>
          {rating && <Rating value={(rating * 10).toFixed(0)} size='small' />}
          <div>
            <h2 className={classes.author}>{review.author}</h2>
            <p className={classes.date}>{formatDate(review.updated_at)}</p>
          </div>
        </div>
        <p className={classes.content}>{review.content}</p>
      </div>
    </div>
  );
};

interface IReviewsList {
  reviews: IReview[];
  mediaTitle: string | undefined;
}

const ReviewsList = ({ reviews, mediaTitle }: IReviewsList) => {
  return (
    <>
      {reviews.length > 0 && (
        <ul className={classes['reviews-list']}>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      )}

      {reviews.length === 0 && (
        <EmptyResource
          title='No Reviews Yet'
          description={`There are no reviews for ${mediaTitle} yet.`}
        />
      )}
    </>
  );
};

export default ReviewsList;
