import Review from '../reviews_list/ReviewItem';
import { getPosterImage } from '../../../helpers/imageSizes';
import { IReview } from '../../../models/commonModel';
import HorizontalList from '../../horizontal_list/HorizontalList';

interface IReviewsList {
  reviews: { results: IReview[] };
  title: string;
  poster_path: string;
}

const ReviewsList = ({ reviews, title, poster_path }: IReviewsList) => {
  if (!reviews || !reviews.results || reviews.results.length === 0) return null;

  return (
    <>
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
          <Review key={review.id} review={review} viewFull={false} />
        ))}
      </HorizontalList>
    </>
  );
};

export default ReviewsList;
