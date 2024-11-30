import { useLocation } from 'react-router-dom';
import classes from './ReviewsPage.module.css';
import { IReview } from '../../models/commonModel';
import { ReviewItem } from '../../components/lists/reviews_list/ReviewsList';

const ReviewsPage = () => {
  const location = useLocation();
  const { reviews } = location.state;

  return (
    <ul className={classes['reviews-list']}>
      {reviews.results.map((review: IReview) => (
        <ReviewItem key={review.id} review={review} viewFull={true} />
      ))}
    </ul>
  );
};

export default ReviewsPage;
