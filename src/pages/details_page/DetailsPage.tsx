import { useParams } from 'react-router-dom';
import classes from './DetailsPage.module.css';
import DetailsHeader from './details_header/DetailsHeader';
import DetailsMain from './DetailsMain';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import ErrorPage from '../error_page/ErrorPage';
import useDetails from '../../hooks/useDetails';
import Tabs, { ITabObject } from '../../components/ui/tabs/Tabs';
import { DETAILS_TABS } from '../../data/tabsData';
import { useState } from 'react';
import CreditsList from '../../components/lists/credits_list/CreditsList';
import { ReviewItem } from '../../components/lists/reviews_list/ReviewsList';
import CrewList from '../../components/lists/crew_list/CrewList';

const DetailsPage = ({ isMovie }: { isMovie: boolean }) => {
  const params = useParams();
  const id = params.movieId || params.tvId;
  const tabs: ITabObject[] = DETAILS_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (tab: ITabObject) => {
    setSelectedTab(tab);
  };

  const { data, isLoading, isError } = useDetails({ id, isMovie });

  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorPage />;

  return (
    <div className={classes['page-container']}>
      <DetailsHeader
        title={'title' in data ? data.title : data.name}
        overview={data.overview}
        genres={data.genres}
        vote_average={data.vote_average}
        release_date={'title' in data ? data.release_date : null}
        runtime={'title' in data ? data.runtime : null}
        backdrop_path={data.backdrop_path}
        vote_count={data.vote_count}
      />

      <div className={classes['main-container']}>
        <Tabs
          onSelectType={handleSelectTab}
          selectedType={selectedTab}
          tabs={tabs}
          layoutId='details_page'
        />
        {selectedTab.value === 'overview' && <DetailsMain media={data} />}
        {selectedTab.value === 'cast' && (
          <CreditsList
            credits={
              'title' in data ? data.credits.cast : data.aggregate_credits.cast
            }
          />
        )}
        {selectedTab.value === 'crew' && (
          <CrewList
            crew={
              'title' in data ? data.credits.crew : data.aggregate_credits.crew
            }
          />
        )}
        {selectedTab.value === 'reviews' && (
          <ul className={classes['reviews-list']}>
            {data.reviews.results.map((review) => (
              <ReviewItem key={review.id} review={review} viewFull={true} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
