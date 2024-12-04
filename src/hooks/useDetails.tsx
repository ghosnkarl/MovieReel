import { useQuery } from '@tanstack/react-query';
import { IMovieDetails, ITVDetails } from '../models/detailsModel';
import { fetchSingleResult } from '../services/http';

interface IUseDetails {
  isMovie: boolean;
  id: string | undefined;
}

const useDetails = ({ isMovie, id }: IUseDetails) => {
  const credits = isMovie ? 'credits' : 'aggregate_credits';
  const queryParams = {
    append_to_response: `${credits},images,videos,keywords,reviews,recommendations`,
    include_image_language: 'en,null',
  };
  const mediaType = isMovie ? 'movie' : 'tv';

  return useQuery<IMovieDetails | ITVDetails>({
    queryKey: [isMovie ? 'movie' : 'tv', id],
    queryFn: () =>
      fetchSingleResult<IMovieDetails | ITVDetails>({
        path: `${mediaType}/${id}`,
        params: queryParams,
      }),
    retry: 0,
  });
};

export default useDetails;
