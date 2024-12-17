import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '../services/http';
import { IMedia } from '../models/mediaModel';

interface IDiscover {
  mediaType: 'movie' | 'tv';
  params: string;
}

const useDiscover = ({ params, mediaType }: IDiscover) => {
  return useQuery({
    queryKey: [mediaType, params],
    queryFn: () =>
      fetchResults<IMedia>({
        path: `discover/${mediaType}`,
        params: params,
        pageParam: 1,
      }),
    retry: 1,
  });
};

export default useDiscover;
