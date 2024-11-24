import Review from '../Review';
import { getPosterImage } from '../../helpers/imageSizes';
import { IReview } from '../../models/commonModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';

const DetailsReviews = ({
  reviews,
  title,
  poster_path,
}: {
  reviews: { results: IReview[] };
  title: string;
  poster_path: string;
}) => {
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

export default DetailsReviews;
