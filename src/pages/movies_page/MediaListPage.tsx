import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Tabs, { ITabObject } from '../../components/ui/tabs/Tabs';
import { MOVIE_TABS, TV_TABS } from '../../data/tabsData';
import MediaList from '../../components/lists/media_list/MediaList';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import ErrorPage from '../error_page/ErrorPage';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { fetchResults } from '../../services/http';
import { IMedia } from '../../models/mediaModel';

export default function MoviesPage({ type }: { type: 'movie' | 'tv' }) {
  const location = useLocation();
  const initialTabIndex = location.state?.initialTab || 0;
  const tabs = type === 'movie' ? MOVIE_TABS : TV_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[initialTabIndex]);

  useEffect(() => {
    setSelectedTab(tabs[initialTabIndex]);
  }, [type]);

  const handleSelectTab = (tab: ITabObject) => {
    setSelectedTab(tab);
  };

  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [type, selectedTab.value],
    queryFn: ({ pageParam = 1 }) =>
      fetchResults<IMedia>({
        path: selectedTab.path,
        params: selectedTab.params,
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

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorPage />;

  const allMedia = data.pages
    .flatMap((page) => page.results)
    .filter(
      (media, index, self) => self.findIndex((m) => m.id === media.id) === index
    );

  return (
    <div>
      <Tabs
        onSelectType={handleSelectTab}
        selectedType={selectedTab}
        tabs={tabs}
      />

      <ul className='grid--6-cols'>
        {allMedia.map((media) => (
          <li key={media.id}>
            <MediaList type={type} data={[media]} />
          </li>
        ))}
      </ul>

      <div
        style={{
          alignSelf: 'center',
          justifySelf: 'center',
          marginTop: '1.2rem',
        }}
        ref={ref}
      >
        {isFetchingNextPage && <LoadingIndicator />}
      </div>
    </div>
  );
}
