import { useEffect, useState } from 'react';
import Tabs, { ITabObject } from '../../components/ui/tabs/Tabs';
import { MOVIE_TABS, TV_TABS } from '../../data/tabsData';
import MediaList from '../../components/lists/media_list/MediaList';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import ErrorPage from '../error_page/ErrorPage';
import { useLocation } from 'react-router-dom';
import InfiniteLoader from '../../components/infinite_loader/InfiniteLoader';
import useInfiniteMediaQuery from '../../hooks/useInfiniteMediaQuery';
import { MediaType } from '../../helpers/constants';

export default function MoviesPage({ type }: { type: MediaType }) {
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
  } = useInfiniteMediaQuery({ type, selectedTab });

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

      <InfiniteLoader
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        <ul className='grid--6-cols'>
          {allMedia.map((media) => (
            <li key={media.id}>
              <MediaList type={type} data={[media]} />
            </li>
          ))}
        </ul>
      </InfiniteLoader>
    </div>
  );
}
