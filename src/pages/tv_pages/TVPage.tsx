import { useQuery } from '@tanstack/react-query';
import classes from '../movies_page/MoviesPage.module.css';
import { ITVShow } from '../../models/mediaModel';
import { useState } from 'react';
import Tabs, { ITabObject } from '../../components/ui/tabs/Tabs';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import { TV_TABS } from '../../data/tabsData';
import MediaList from '../../components/lists/media_list/MediaList';

export default function TVPage() {
  const tabs: ITabObject[] = TV_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (tab: ITabObject) => {
    setSelectedTab(tab);
  };

  const { data } = useQuery({
    queryKey: ['tv', selectedTab.value],
    queryFn: () => selectedTab.query,
    retry: 1,
  });

  let content = <LoadingIndicator />;

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
        <button className={classes['btn--more']}>Load More</button>
      </div>
    </div>
  );
}
