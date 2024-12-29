import { useParams } from 'react-router-dom';
import classes from './DetailsPage.module.css';
import DetailsHeader from './details_header/DetailsHeader';
import DetailsMain from './DetailsMain';
import ErrorPage from '../errorPage/ErrorPage';
import useDetails from '@/hooks/useDetails';
import Tabs from '@/components/ui/tabs/Tabs';
import { DETAILS_TABS } from '@/data/tabsData';
import { useMemo, useState } from 'react';
import CreditsList from '@/components/lists/creditsList/CreditsList';
import ReviewsList from '@/components/lists/reviewsList/ReviewsList';
import CrewList from '@/components/lists/crewList/CrewList';
import VideoList from '@/components/lists/videoList/VideoList';
import ImageList from '@/components/lists/imageList/ImageList';
import { getGalleryImages } from '@/helpers/galleryImages';
import LoadingIndicator from '@/components/ui/loadingSpinner/LoadingIndicator';

const DetailsPage = ({ isMovie }: { isMovie: boolean }) => {
  const params = useParams();
  const id = params.movieId || params.tvId;

  const tabs = useMemo(() => DETAILS_TABS, []);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const { data, isLoading, isError } = useDetails({ id, isMovie });

  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorPage />;

  const {
    reviews: { results: reviewsResults },
    videos: { results: videosResults },
    images,
  } = data;

  const renderTabContent = () => {
    switch (selectedTab.value) {
      case 'overview':
        return <DetailsMain media={data} />;
      case 'cast':
        return (
          <CreditsList
            credits={data.credits?.cast || data.aggregate_credits?.cast}
          />
        );
      case 'crew':
        return (
          <CrewList crew={data.credits?.crew || data.aggregate_credits?.crew} />
        );
      case 'reviews':
        return (
          <ReviewsList
            reviews={reviewsResults}
            mediaTitle={data.title || data.name}
          />
        );
      case 'videos':
        return (
          <VideoList
            videos={videosResults}
            mediaTitle={data.title || data.name}
          />
        );
      case 'images':
        return (
          <ImageList
            images={getGalleryImages({ images })}
            mediaTitle={data.title || data.name}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className={classes.mainContainer}>
        <DetailsHeader media={data} />
        <Tabs
          onSelectType={setSelectedTab}
          selectedType={selectedTab}
          tabs={DETAILS_TABS}
        />
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DetailsPage;
