import { useLocation } from 'react-router-dom';
import classes from './ReviewsPage.module.css';
import Review from '../../components/lists/reviews_list/ReviewItem';
import { IReview } from '../../models/commonModel';

const ReviewsPage = () => {
  const location = useLocation();
  const { reviews } = location.state;

  return (
    <ul className={classes['reviews-list']}>
      {reviews.results.map((review: IReview) => (
        <Review key={review.id} review={review} viewFull={true} />
      ))}
    </ul>
  );
};

export default ReviewsPage;
