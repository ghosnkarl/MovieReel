import { useLocation } from 'react-router-dom';
import classes from './reviews-page.module.css';
import { ReviewInterface } from '../../models/mediaModel';
import Review from '../../components/Review';

const ReviewsPage = () => {
  const location = useLocation();
  const { reviews } = location.state;

  return (
    <ul className={classes['reviews-list']}>
      {reviews.results.map((review: ReviewInterface) => (
        <Review key={review.id} review={review} viewFull={true} />
      ))}
    </ul>
  );
};

export default ReviewsPage;
