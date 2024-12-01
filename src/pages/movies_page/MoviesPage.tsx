import { useQuery } from '@tanstack/react-query';
import classes from './MoviesPage.module.css';
import { useState } from 'react';
import Tabs, { TabObjectProps } from '../../components/ui/tabs/Tabs';
import { MOVIE_TABS } from '../../data/tabsData';
import { IMovie } from '../../models/mediaModel';
import MediaList from '../../components/lists/media_list/MediaList';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import ErrorPage from '../error_page/ErrorPage';

export default function MoviesPage() {
  const tabs = MOVIE_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (tab: TabObjectProps) => {
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
        tabs={tabs}
        layoutId='movies_page'
      />
      <div className={classes.container}>
        <ul className={classes['main-container']}>
          <MediaList type='movies' data={selectedQuery.data as IMovie[]} />
        </ul>
        <button className={classes['btn--more']}>Load More</button>
      </div>
    </div>
  );
}
