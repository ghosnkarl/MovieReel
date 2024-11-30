import { getPosterImage } from '../../../helpers/imageSizes';
import { IReview } from '../../../models/commonModel';
import HorizontalList from '../../horizontal_list/HorizontalList';
import classes from './ReviewItem.module.css';
import Rating from '../../rating/Rating';
import { formatDate } from '../../../helpers/dateFormatter';

interface IReviewItem {
  review: IReview;
  viewFull: boolean;
}

export const ReviewItem = ({ review, viewFull }: IReviewItem) => {
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
            <h2 className={classes.author}>{review.author}</h2>
            <p className={classes.date}>{formatDate(review.updated_at)}</p>
          </div>
        </div>
        <p
          className={`${classes.content} ${
            !viewFull ? classes['max--lines'] : ''
          }`}
        >
          {review.content}
        </p>
      </div>
    </div>
  );
};

interface IReviewsList {
  reviews: { results: IReview[] };
  title: string;
  poster_path: string;
}

const ReviewsList = ({ reviews, title, poster_path }: IReviewsList) => {
  if (!reviews || !reviews.results || reviews.results.length === 0) return null;

  return (
    <HorizontalList
      title='Reviews'
      link='review'
      linkState={{
        reviews: reviews,
        title: title,
        image: getPosterImage(poster_path, 'w342'),
      }}
    >
      {reviews.results.map((review) => (
        <ReviewItem key={review.id} review={review} viewFull={false} />
      ))}
    </HorizontalList>
  );
};

export default ReviewsList;
