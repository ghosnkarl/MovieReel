import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '../services/http';
import { IMedia } from '../models/mediaModel';

const useTrending = ({ type }: { type: 'movie' | 'tv' }) =>
  useQuery({
    queryKey: [type, 'trending'],
    queryFn: () =>
      fetchResults<IMedia>({
        path: `trending/${type}/week`,
        params: null,
      }),
    retry: 1,
  });

export default useTrending;
