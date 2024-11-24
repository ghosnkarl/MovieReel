import Review from '../Review';
import { getPosterImage } from '../../helpers/imageSizes';
import { IReview } from '../../models/commonModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';

interface IReviewsList {
  reviews: { results: IReview[] };
  title: string;
  poster_path: string;
}

const ReviewsList = ({ reviews, title, poster_path }: IReviewsList) => {
  if (!reviews || !reviews.results || reviews.results.length === 0) return null;

  return (
    <>
      <HorizontalListContainer
        title='Reviews'
        link='review'
        linkState={{
          reviews: reviews,
          title: title,
          image: getPosterImage(poster_path, 'w342'),
        }}
      >
        {reviews.results.map((review) => (
          <Review key={review.id} review={review} viewFull={false} />
        ))}
      </HorizontalListContainer>
    </>
  );
};

export default ReviewsList;
