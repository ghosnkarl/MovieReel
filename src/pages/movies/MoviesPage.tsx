import { useQuery } from '@tanstack/react-query';
import classes from './movies-page.module.css';
import MediaList from '../../components/horizontal_list/MediaList';
import { MediaListInterface } from '../../models/mediaModel';
import { useState } from 'react';
import { MOVIE_TABS } from '../../helpers/data';
import ListTabs, { TabOjectProps } from '../../components/tabs/ListTabs';
import LoadingIndicator from '../../components/ui/LoadingIndicator';

export default function MoviesPage() {
  const tabs: TabOjectProps[] = MOVIE_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (tab: TabOjectProps) => {
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
      <ListTabs
        onSelectType={handleSelectTab}
        selectedType={selectedTab}
        tabs={tabs}
        layoutId='movies_page'
      />
      <div className={classes['main-container']}>{content}</div>
    </div>
  );
}
