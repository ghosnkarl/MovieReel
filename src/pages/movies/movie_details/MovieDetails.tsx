import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../../services/http';
import { getBackdropImage, getPosterImage } from '../../../helpers/imageSizes';
import classes from './movie-details.module.css';
import CastList from '../../../components/details_components/cast/CastList';
import VideoList from '../../../components/details_components/videos/VideoList';
import ImageList from '../../../components/details_components/images/ImageList';
import MediaDetails from '../../../components/details_components/media_details/MediaDetails';
import MediaList from '../../../components/horizontal_list/MediaList';
import DetailsHeader from '../../../components/details_components/details_header/DetailsHeader';
import DetailsReviews from '../../../components/details_components/details_reviews/DetailsReviews';
import { getGalleryImages } from '../../../helpers/galleryImages';
import LoadingIndicator from '../../../components/ui/LoadingIndicator';
import ErrorBlock from '../../../components/ui/ErrorBlock';
import HorizontalListContainer from '../../../components/horizontal_list/containers/HorizontalListContainer';
import Keywords from '../../../components/keywords/Keywords';
import ScrollToTop from '../../../components/ui/ScrollToTop';

const MovieDetails = () => {
  const params = useParams();
  const movieId = params.movieId;

  const { data, isError, error, refetch } = useQuery({
    queryKey: ['movies', movieId],
    queryFn: () => fetchMovieDetails(movieId),
    retry: 0,
  });

  let content = <LoadingIndicator title='Fetching Movie Details' />;

  if (isError) {
    content = (
      <ErrorBlock
        title='Error Fetching Movie Details'
        message={error.message.status_message}
        onTryAgainClick={refetch}
      />
    );
  }

  if (data) {
    const images = getGalleryImages({ images: data.images });

    content = (
      <>
        <img
          className={classes['backdrop-img']}
          src={getBackdropImage(data.backdrop_path, 'w1280')}
          alt={data.title}
        />
        <DetailsHeader
          title={data.title}
          overview={data.overview}
          genres={data.genres}
          vote_average={data.vote_average}
          release_date={data.release_date}
          runtime={data.runtime}
        />
        <div className={classes['details-container']}>
          <div className={classes['main-container']}>
            {data.credits && (
              <CastList
                title={data.title}
                image={getPosterImage(data.poster_path, 'w342')}
                credits={data.credits}
              />
            )}

            {data.videos.results && data.videos.results.length > 0 && (
              <VideoList videos={data.videos.results} />
            )}

            <ImageList
              images={images}
              backdropList={data.images.backdrops}
              title={data.title}
              image={getPosterImage(data.poster_path, 'w342')}
            />

            {data.recommendations &&
              data.recommendations.results &&
              data.recommendations.results.length > 0 && (
                <HorizontalListContainer
                  link=''
                  title={`If you like ${data.title}, check out`}
                  linkState={null}
                >
                  <MediaList
                    data={data.recommendations.results}
                    type='movies'
                  />
                </HorizontalListContainer>
              )}
          </div>
          <div className={classes['side__container']}>
            <MediaDetails
              status={data.status}
              homepage={data.homepage}
              imdb_id={data.imdb_id}
              production_companies={data.production_companies}
              revenue={data.revenue}
              budget={data.budget}
              tagline={data.tagline}
              collection={data.belongs_to_collection}
            />
            <Keywords keywords={data.keywords.keywords} />

            <DetailsReviews
              reviews={data.reviews}
              title={data.title}
              poster_path={data.poster_path}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <ScrollToTop>
      <div className={classes['page-container']}>{content}</div>
    </ScrollToTop>
  );
};

export default MovieDetails;
