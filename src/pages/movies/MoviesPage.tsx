import { useQuery } from '@tanstack/react-query';
import classes from './movies-page.module.css';
import MediaList from '../../components/horizontal_list/MediaList';
import { MediaListInterface } from '../../models/mediaModel';
import { useState } from 'react';
import Tabs, { TabObjectProps } from '../../components/Tabs';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import { MOVIE_TABS } from '../../data/data';

export default function MoviesPage() {
  const tabs: TabObjectProps[] = MOVIE_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (tab: TabObjectProps) => {
    setSelectedTab(tab);
  };

  const { data, isError, error, refetch } = useQuery({
    queryKey: ['movies', selectedTab.value],
    queryFn: () => selectedTab.query,
    retry: 1,
  });

  let content = <LoadingIndicator title={`Fetching ${selectedTab.title}...`} />;

  if (data) {
    content = <MediaList type='movies' data={data as MediaListInterface[]} />;
  }

  return (
    <div className='page-container'>
      <Tabs
        onSelectType={handleSelectTab}
        selectedType={selectedTab}
        tabs={tabs}
        layoutId='movies_page'
      />
      <div className={classes.container}>
        <ul className={classes['main-container']}>{content}</ul>
        <button className={`btn ${classes['btn--more']}`}>Load More</button>
      </div>
    </div>
  );
}
