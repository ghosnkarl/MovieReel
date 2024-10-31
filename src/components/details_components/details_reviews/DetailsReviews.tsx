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
      <Section>
        <div className='list-header'>
          <h1>Reviews</h1>
          <NavLink
            state={{
              reviews: reviews,
              title: title,
              image: getPosterImage(poster_path, 'w342'),
            }}
            className='btn-view'
            to='review'
          >
            View All
          </NavLink>
        </div>
        <ul className={classes['reviews-list']}>
          {reviews.results.slice(0, 3).map((review) => (
            <Review key={review.id} review={review} shortenText={true} />
          ))}
        </ul>
      </Section>
    );
  }
  return <>{reviewContent}</>;
};

export default DetailsReviews;
