import { useQuery } from '@tanstack/react-query';
import classes from '../styles/movies-page.module.css';
import MediaList from '../components/horizontal_list/MediaList';
import { useState } from 'react';
import Tabs, { TabObjectProps } from '../components/Tabs';
import { MOVIE_TABS } from '../data/data';
import QueryWrapper from '../components/QueryWrapper';
import { IMovie } from '../models/mediaModel';

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

  let content = <></>;

  if (selectedQuery.data) {
    content = <MediaList type='movies' data={selectedQuery.data as IMovie[]} />;
  }

  return (
    <div className='page-container'>
      <QueryWrapper query={selectedQuery} message={selectedTab.title}>
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
      </QueryWrapper>
    </div>
  );
}
