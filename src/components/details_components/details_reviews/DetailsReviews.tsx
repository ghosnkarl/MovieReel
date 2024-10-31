import { NavLink } from 'react-router-dom';
import { ReviewInterface } from '../../../models/mediaModel';
import { getPosterImage } from '../../../helpers/imageSizes';
import Review from '../../review/Review';
import classes from '../../../pages/movies/movie_details/movie-details.module.css';
import Section from '../../section/Section';

const DetailsReviews = ({
  reviews,
  title,
  poster_path,
}: {
  reviews: { results: ReviewInterface[] };
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
