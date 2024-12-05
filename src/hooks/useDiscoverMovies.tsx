import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '../services/http';
import { IMovie } from '../models/mediaModel';
import { discoverReleaseDates } from '../helpers/discoverHelpers';

const useDiscoverMovies = () => {
  const discoverParams = discoverReleaseDates(true, -1, 'month', 5, 'days');
  return useQuery({
    queryKey: ['movies', discoverParams],
    queryFn: () =>
      fetchResults<IMovie>({
        path: 'discover/movie',
        params: discoverParams,
      }),
    retry: 1,
  });
};

export default useDiscoverMovies;
