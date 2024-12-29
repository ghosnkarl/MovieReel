import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchResults } from '../services/http';
import { IMedia } from '../models/mediaModel';
import { TabObjectProps } from '../components/ui/tabs/Tabs';
import { MediaType } from '../helpers/constants';

interface IUseInfiniteMediaQuery {
  type: MediaType;
  selectedTab: TabObjectProps;
}

const useInfiniteMediaQuery = ({ type, selectedTab }: IUseInfiniteMediaQuery) =>
  useInfiniteQuery({
    queryKey: [type, selectedTab.value, 'list'],
    queryFn: ({ pageParam = 1 }) =>
      fetchResults<IMedia>({
        path: selectedTab.path!,
        params: selectedTab.params!,
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

export default useInfiniteMediaQuery;
