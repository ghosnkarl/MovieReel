import { useParams } from 'react-router-dom';
import classes from './PeopleDetailsPage.module.css';
import { useMemo, useState } from 'react';
import { CREDITS_TABS } from '../../data/tabsData';
import Tabs, { TabObjectProps } from '../../components/ui/tabs/Tabs';
import { ICastMedia, ICrewMedia } from '../../models/peopleModel';
import { IImage } from '../../models/commonModel';
import { MediaItem } from '../../components/lists/mediaList/MediaList';
import ErrorPage from '../errorPage/ErrorPage';
import ImageList from '../../components/lists/imageList/ImageList';
import TaggedList from './TaggedList';
import EmptyResource from '../../components/ui/emptyResource/EmptyResource';
import usePersonDetails from '../../hooks/usePersonDetails';
import { tmdbImage } from '../../helpers/imageSizes';
import { format } from '../../helpers/format';
import { MediaType } from '../../helpers/constants';
import LoadingIndicator from '../../components/ui/loadingSpinner/LoadingIndicator';

interface MediaItemsProps {
  media: ICastMedia[] | ICrewMedia[];
  mediaType: 'acting credits' | 'tv acting credits' | 'credits';
}

export const MediaItems = ({ media, mediaType }: MediaItemsProps) => {
  if (media.length === 0) {
    return (
      <EmptyResource
        title='No Media'
        description={`There are no ${mediaType} for this person.`}
      />
    );
  }

  return (
    <div className={'grid--6-cols'}>
      {media.map((item) => (
        <MediaItem
          key={item.credit_id}
          id={item.id}
          title={item.title || item.name}
          type={item.media_type}
          poster_path={item.poster_path}
          text={'character' in item ? item.character : item.job}
        />
      ))}
    </div>
  );
};

interface IDetailsItemProps {
  title: string;
  text: string | null | number;
}

const DetailsItem = ({ title, text }: IDetailsItemProps) => (
  <div>
    <p className={classes.detailsTitle}>{title}</p>
    <p className={classes.detailsText}>{text}</p>
  </div>
);

const PeopleDetailsPage = () => {
  const { personId } = useParams();
  const [selectedTab, setSelectedTab] = useState(CREDITS_TABS[0]);

  const { data, isLoading, isError } = usePersonDetails({ personId });

  const handleSelectTab = (tab: TabObjectProps) => {
    setSelectedTab(tab);
  };

  // Memoizing profile images
  const profiles = useMemo(() => {
    if (!data?.images?.profiles) return [];
    return data.images.profiles.map((profile: IImage) => ({
      galleryImage: tmdbImage.profile(profile.file_path, 'h632'),
      fullImage: tmdbImage.profile(profile.file_path, 'original'),
    }));
  }, [data]);

  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorPage />;

  // Destructuring combined_credits
  const { cast, crew } = data.combined_credits || {};

  const movies =
    cast?.filter((item) => item.media_type === MediaType.MOVIE) || [];
  const tvShows =
    cast?.filter((item) => item.media_type === MediaType.TV) || [];

  const birthdate = data.birthday
    ? `${format.date(data.birthday)}  ${
        data.deathday
          ? ''
          : `(${format.years(
              new Date().toISOString().split('T')[0],
              data.birthday
            )} years old)`
      }`
    : 'Unknown';

  return (
    <div>
      <div className={classes.header}>
        <img
          className={classes.profileImg}
          alt={data.name}
          src={tmdbImage.profile(data.profile_path, 'h632')}
        />
        <div className={classes.textContainer}>
          <h1 className={classes.name}>{data.name}</h1>
          <div className={classes.detailsContainer}>
            <DetailsItem
              title='Known for'
              text={data.known_for_department || 'Unknown'}
            />
            <DetailsItem title='Birthdate' text={birthdate} />

            {data.deathday && data.birthday && (
              <DetailsItem
                title='Date of Death'
                text={`${format.date(data.deathday)} (${format.years(
                  data.deathday,
                  data.birthday
                )} years old)`}
              />
            )}

            <DetailsItem
              title='Hometown'
              text={data.place_of_birth || 'Unknown'}
            />
            <DetailsItem title='Acting credits' text={movies.length} />
            <DetailsItem title='TV acting credits' text={tvShows.length} />
            <DetailsItem
              title='Movie credits'
              text={
                crew.filter((item) => item.media_type === MediaType.MOVIE)
                  .length
              }
            />
            <DetailsItem
              title='TV credits'
              text={
                crew.filter((item) => item.media_type === MediaType.TV).length
              }
            />
          </div>
        </div>
      </div>
      <div className={classes.mainContent}>
        <div className={classes.combinedCredits}>
          <Tabs
            onSelectType={handleSelectTab}
            selectedType={selectedTab}
            tabs={CREDITS_TABS}
          />

          {selectedTab.value === 'biography' && (
            <p className={classes.biography}>
              {data.biography || 'Biography not available'}
            </p>
          )}

          {selectedTab.value === MediaType.MOVIE && (
            <MediaItems media={movies} mediaType='acting credits' />
          )}
          {selectedTab.value === MediaType.TV && (
            <MediaItems media={tvShows} mediaType='tv acting credits' />
          )}
          {selectedTab.value === 'crew' && crew && <TaggedList crew={crew} />}
          {selectedTab.value === 'images' && (
            <ImageList images={profiles} mediaTitle={data.name} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailsPage;
