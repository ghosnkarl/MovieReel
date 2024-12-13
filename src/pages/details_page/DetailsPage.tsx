import { NavLink, useParams } from 'react-router-dom';
import classes from './DetailsPage.module.css';
import DetailsHeader from './details_header/DetailsHeader';
import DetailsMain from './DetailsMain';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import ErrorPage from '../error_page/ErrorPage';
import useDetails from '../../hooks/useDetails';
import { ITabObject } from '../../components/ui/tabs/Tabs';
import { DETAILS_TABS } from '../../data/tabsData';
import { useMemo, useState } from 'react';
import CreditsList from '../../components/lists/credits_list/CreditsList';
import { ReviewItem } from '../../components/lists/reviews_list/ReviewsList';
import CrewList from '../../components/lists/crew_list/CrewList';
import VideoList from '../../components/lists/video_list/VideoList';
import { getGalleryImages } from '../../helpers/galleryImages';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const DetailsPage = ({ isMovie }: { isMovie: boolean }) => {
  const params = useParams();
  const id = params.movieId || params.tvId;

  const tabs: ITabObject[] = useMemo(() => DETAILS_TABS, []);
  const [selectedTab, setSelectedTab] = useState<ITabObject>(tabs[0]);

  const { data, isLoading, isError } = useDetails({ id, isMovie });

  // Handle loading and error states
  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorPage />;

  // Destructure data fields for cleaner access
  const {
    genres,
    vote_average,
    backdrop_path,
    vote_count,
    reviews,
    videos,
    images,
  } = data;

  // Render tab content based on selectedTab
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
          <ul className={classes['reviews-list']}>
            {reviews.results.map((review) => (
              <ReviewItem key={review.id} review={review} viewFull={true} />
            ))}
          </ul>
        );
      case 'videos':
        return <VideoList videos={videos.results} />;
      case 'images':
        return (
          <div className={classes['images-container']}>
            {getGalleryImages({ images }).map((image) => (
              <NavLink
                className={classes.container}
                key={image.galleryImage}
                to={image.fullImage}
                target='_blank'
              >
                <LazyLoadImage src={image.galleryImage} />
              </NavLink>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <DetailsHeader
        title={data.title || data.name}
        genres={genres}
        vote_average={vote_average}
        release_date={data.release_date || data.last_air_date}
        runtime={data.runtime || null}
        backdrop_path={backdrop_path}
        vote_count={vote_count}
        handleSelectTab={setSelectedTab}
        selectedTab={selectedTab}
      />

      <div className={classes['main-container']}>{renderTabContent()}</div>
    </div>
  );
};

export default DetailsPage;
