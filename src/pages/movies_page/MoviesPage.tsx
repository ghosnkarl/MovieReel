import { useQuery } from '@tanstack/react-query';
import classes from './MoviesPage.module.css';
import { useState } from 'react';
import Tabs, { ITabObject } from '../../components/ui/tabs/Tabs';
import { MOVIE_TABS } from '../../data/tabsData';
import MediaList from '../../components/lists/media_list/MediaList';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import ErrorPage from '../error_page/ErrorPage';
import { IMedia } from '../../models/mediaModel';

export default function MoviesPage() {
  const [selectedTab, setSelectedTab] = useState(MOVIE_TABS[0]);

  const handleSelectTab = (tab: ITabObject) => {
    setSelectedTab(tab);
  };

  const selectedQuery = useQuery({
    queryKey: ['movies', selectedTab.value],
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
        tabs={MOVIE_TABS}
        layoutId='movies_page'
      />
      <div className={classes.container}>
        <ul className='grid--5-cols'>
          <MediaList type='movies' data={selectedQuery.data as IMedia[]} />
        </ul>
      </div>
    </div>
  );
}
