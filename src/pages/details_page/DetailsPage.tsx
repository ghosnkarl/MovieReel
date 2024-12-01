import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSingleResult } from '../../services/http';
import classes from './DetailsPage.module.css';
import DetailsHeader from './details_header/DetailsHeader';

import DetailsMain from './DetailsMain';
import { IMovieDetails, ITVDetails } from '../../models/detailsModel';
import QueryWrapper from '../../components/ui/QueryWrapper';

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

  if (!media) return null;

  return (
    <div className={classes['page-container']}>
      <QueryWrapper
        query={query}
        message={`${isMovie ? 'Movie' : 'TV'} Details`}
      >
        <DetailsHeader
          title={'title' in media ? media.title : media.name}
          overview={media.overview}
          genres={media.genres}
          vote_average={media.vote_average}
          release_date={'title' in media ? media.release_date : null}
          runtime={'title' in media ? media.runtime : null}
          backdrop_path={media.backdrop_path}
          vote_count={media.vote_count}
        />

        <DetailsMain media={media} />
      </QueryWrapper>
    </div>
  );
};

export default DetailsPage;
