import { useQuery } from '@tanstack/react-query';
import classes from './MediaListPage.module.css';
import { useState } from 'react';
import Tabs, { ITabObject } from '../../components/ui/tabs/Tabs';
import { MOVIE_TABS, TV_TABS } from '../../data/tabsData';
import MediaList from '../../components/lists/media_list/MediaList';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import ErrorPage from '../error_page/ErrorPage';
import { IMedia } from '../../models/mediaModel';

export default function MoviesPage({ type }: { type: 'movie' | 'tv' }) {
  const tabs = type === 'movie' ? MOVIE_TABS : TV_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (tab: ITabObject) => {
    setSelectedTab(tab);
  };

  const selectedQuery = useQuery({
    queryKey: [type, selectedTab.value],
    queryFn: () => selectedTab.query,
    retry: 1,
  });

  if (selectedQuery.isLoading) return <LoadingIndicator />;
  if (selectedQuery.isError) return <ErrorPage />;

  return (
    <div className='page-container'>
      <Tabs
        onSelectType={handleSelectTab}
        selectedType={selectedTab}
        tabs={tabs}
        layoutId={type}
      />
      <div className={classes.container}>
        <ul className='grid--6-cols'>
          <MediaList type={type} data={selectedQuery.data as IMedia[]} />
        </ul>
      </div>
    </div>
  );
}
