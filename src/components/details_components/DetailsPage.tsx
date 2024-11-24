import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSingleResult } from '../../services/http';
import classes from '../../styles/details-page.module.css';
import DetailsPageHeader from '../details_page_header/DetailsPageHeader';
import QueryWrapper from '../../components/QueryWrapper';
import DetailsMainContainer from '../../components/details_components/DetailsMainContainer';
import { IMovieDetails } from '../../models/detailsModel';
import { getBackdropImage } from '../../helpers/imageSizes';
import { ITVDetails } from '../../models/seasonModel';

const DetailsPage = ({ isMovie }: { isMovie: boolean }) => {
  const params = useParams();
  const mediaId = isMovie ? params.movieId : params.tvId;
  const credits = isMovie ? 'credits' : 'aggregate_credits';
  const queryParams = {
    append_to_response: `${credits},images,videos,keywords,reviews,recommendations`,
    include_image_language: 'en,null',
  };

  const query = useQuery({
    queryKey: [isMovie ? 'movie' : 'tv', mediaId],
    queryFn: () =>
      fetchSingleResult({
        path: `${isMovie ? 'movie' : 'tv'}/${mediaId}`,
        params: queryParams,
      }),
    retry: 0,
  });

  const media = isMovie
    ? (query.data as IMovieDetails)
    : (query.data as ITVDetails);

  return (
    <div className={classes['page-container']}>
      <QueryWrapper
        query={query}
        message={`${isMovie ? 'Movie' : 'TV'} Details`}
      >
        {media && (
          <>
            <img
              className={classes['backdrop__img']}
              src={getBackdropImage(media.backdrop_path, 'w1280')}
              alt={'title' in media ? media.title : media.name}
            />
            <DetailsPageHeader
              title={'title' in media ? media.title : media.name}
              overview={media.overview}
              genres={media.genres}
              poster_path={media.poster_path}
              vote_average={media.vote_average}
              release_date={'title' in media ? media.release_date : null}
              runtime={'title' in media ? media.runtime : null}
            />

            <DetailsMainContainer media={media} />
          </>
        )}
      </QueryWrapper>
    </div>
  );
};

export default DetailsPage;
