import { useParams } from 'react-router-dom';
import classes from './PeopleDetailsPage.module.css';
import { useMemo, useState } from 'react';
import { CREDITS_TABS } from '../../data/tabsData';
import Tabs, { ITabObject } from '../../components/ui/tabs/Tabs';
import { ICastMedia, ICrewMedia } from '../../models/peopleModel';
import { IImage } from '../../models/commonModel';
import { MediaItem } from '../../components/lists/media_list/MediaList';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import ErrorPage from '../error_page/ErrorPage';
import { MOVIE_TYPE, TV_TYPE } from '../../helpers/constants';
import ImageList from '../../components/lists/image_list/ImageList';
import TaggedList from './TaggedList';
import EmptyResource from '../../components/ui/empty_resource/EmptyResource';
import usePersonDetails from '../../hooks/usePersonDetails';
import { tmdbImage } from '../../helpers/imageSizes';
import { format } from '../../helpers/format';

interface IMediaItemsProps {
  media: ICastMedia[] | ICrewMedia[];
  mediaType: 'acting credits' | 'tv acting credits' | 'credits';
}

export const MediaItems = ({ media, mediaType }: IMediaItemsProps) => {
  return (
    <>
      {media.length > 0 && (
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
      )}

      {media.length === 0 && (
        <EmptyResource
          title='No Media'
          description={`There are no ${mediaType} for this person.`}
        />
      )}
    </>
  );
};

interface IDetailsItemProps {
  title: string;
  text: string | null | number;
}

const DetailsItem = ({ title, text }: IDetailsItemProps) => {
  return (
    <div>
      <p className={classes['details__title']}>{title}</p>
      <p className={classes['details__text']}>{text}</p>
    </div>
  );
};

const PeopleDetailsPage = () => {
  const params = useParams();
  const personId = params.personId;
  const [selectedTab, setSelectedTab] = useState(CREDITS_TABS[0]);

  const { data, isLoading, isError } = usePersonDetails({ personId });

  const handleSelectTab = (tab: ITabObject) => {
    setSelectedTab(tab);
  };

  const profiles = useMemo(() => {
    if (!data?.images?.profiles) return [];
    return data.images.profiles.map((profile: IImage) => ({
      galleryImage: tmdbImage.profile(profile.file_path, 'h632'),
      fullImage: tmdbImage.profile(profile.file_path, 'original'),
    }));
  }, [data]);

  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorPage />;

  const movies = data.combined_credits.cast.filter(
    (item) => item.media_type === MOVIE_TYPE
  );
  const tvShows = data.combined_credits.cast.filter(
    (item) => item.media_type === TV_TYPE
  );

  const { crew } = data.combined_credits;
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
          className={classes['profile-img']}
          alt={data.name}
          src={tmdbImage.profile(data.profile_path, 'h632')}
        />
        <div>
          <h1 className={classes.name}>{data.name}</h1>
          <div className={classes['details__container']}>
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
                crew.filter((item) => item.media_type === MOVIE_TYPE).length
              }
            />
            <DetailsItem
              title='TV credits'
              text={crew.filter((item) => item.media_type === TV_TYPE).length}
            />
          </div>
        </div>
      </div>
      <div className={classes['main-content']}>
        <div className={classes['combined-credits']}>
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

          {selectedTab.value === MOVIE_TYPE && (
            <MediaItems media={movies} mediaType='acting credits' />
          )}
          {selectedTab.value === TV_TYPE && (
            <MediaItems media={tvShows} mediaType='tv acting credits' />
          )}
          {selectedTab.value === 'crew' && data.combined_credits.crew && (
            <TaggedList crew={crew} />
          )}

          {selectedTab.value === 'images' && (
            <ImageList images={profiles} mediaTitle={data.name} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailsPage;
