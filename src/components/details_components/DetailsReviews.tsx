import { NavLink } from 'react-router-dom';
import classes from '../../styles/movie-details.module.css';

import Section from '../Section';
import Review from '../Review';
import { getPosterImage } from '../../helpers/imageSizes';
import { IReview } from '../../models/reviewModel';

const DetailsReviews = ({
  reviews,
  title,
  poster_path,
}: {
  reviews: { results: IReview[] };
  title: string;
  poster_path: string;
}) => {
  let reviewContent = <></>;
  if (reviews && reviews.results && reviews.results.length > 3) {
    reviewContent = (
      <Section border='top'>
        <h1 className='section__title'>Reviews</h1>
        <ul className={classes['reviews-list']}>
          {reviews.results.slice(0, 3).map((review) => (
            <Review key={review.id} review={review} viewFull={false} />
          ))}
        </ul>

        <NavLink
          state={{
            reviews: reviews,
            title: title,
            image: getPosterImage(poster_path, 'w342'),
          }}
          className={classes['btn--more']}
          to='review'
        >
          More Reviews
        </NavLink>
      </Section>
    );
  }
  return <>{reviewContent}</>;
};

export default DetailsReviews;
