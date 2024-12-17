import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchResults } from '../services/http';
import { IPeople } from '../models/peopleModel';

const useInfinitePeopleQuery = () =>
  useInfiniteQuery({
    queryKey: ['popular', 'person', 'list'],
    queryFn: ({ pageParam = 1 }) =>
      fetchResults<IPeople>({
        path: 'person/popular',
        params: null,
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

export default useInfinitePeopleQuery;
