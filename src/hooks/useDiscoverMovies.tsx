import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '../services/http';
import { IMedia } from '../models/mediaModel';

const useDiscoverMovies = ({ params }: { params: string }) => {
  return useQuery({
    queryKey: ['movies', params],
    queryFn: () =>
      fetchResults<IMedia>({
        path: 'discover/movie',
        params: params,
      }),
    retry: 1,
  });
};

export default useDiscoverMovies;
