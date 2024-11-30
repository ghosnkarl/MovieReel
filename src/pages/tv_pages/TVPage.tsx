import { useQuery } from '@tanstack/react-query';
import classes from '../movies_page/MoviesPage.module.css';
import { ITVShow } from '../../models/mediaModel';
import { useState } from 'react';
import Tabs, { TabObjectProps } from '../../components/ui/Tabs';
import LoadingIndicator from '../../components/ui/loading_indicator/LoadingIndicator';
import { TV_TABS } from '../../data/tabsData';
import MediaList from '../../components/lists/media_list/MediaList';

export default function TVPage() {
  const tabs: TabObjectProps[] = TV_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (tab: TabObjectProps) => {
    setSelectedTab(tab);
  };

  const { data } = useQuery({
    queryKey: ['tv', selectedTab.value],
    queryFn: () => selectedTab.query,
    retry: 1,
  });

  let content = <LoadingIndicator title={`Fetching ${selectedTab.title}...`} />;

  if (data) {
    content = <MediaList type='tv' data={data as ITVShow[]} />;
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
