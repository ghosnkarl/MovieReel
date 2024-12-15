import { IReview } from '../../../models/commonModel';
import classes from './ReviewsList.module.css';
import { formatDate } from '../../../helpers/commonHelpers';
import EmptyResource from '../../ui/empty_resource/EmptyResource';
import Rating from '../../rating/Rating';
import { getAvatarImage } from '../../../helpers/imageSizes';

interface IReviewItem {
  review: IReview;
}

const ReviewItem = ({ review }: IReviewItem) => {
  const { rating, avatar_path } = review.author_details;

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.header}>
          <img
            src={getAvatarImage(avatar_path)}
            alt={`${review.author} avatar`}
            className={classes.avatar}
          />

          <div style={{ flex: 1 }}>
            <h2 className={classes.author}>{review.author}</h2>
            <p className={classes.date}>{formatDate(review.updated_at)}</p>
          </div>
          <Rating rating={rating} />
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
