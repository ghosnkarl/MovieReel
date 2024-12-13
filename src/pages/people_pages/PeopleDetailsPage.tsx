import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router-dom';
import { fetchSingleResult } from '../../services/http';
import { getProfileImage } from '../../helpers/imageSizes';
import classes from './PeopleDetailsPage.module.css';
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { CREDITS_TABS } from '../../data/tabsData';
import Tabs, { ITabObject } from '../../components/ui/tabs/Tabs';
import { ICastMedia, ICrewMedia, IPerson } from '../../models/peopleModel';
import { IImage } from '../../models/commonModel';
import { MediaItem } from '../../components/lists/media_list/MediaList';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import TagsList from '../../components/lists/tags_list/TagsList';
import { formatDate } from '../../helpers/commonHelpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import ErrorPage from '../error_page/ErrorPage';
import { MOVIE_TYPE } from '../../helpers/constants';

const MediaItems = ({ media }: { media: ICastMedia[] | ICrewMedia[] }) => {
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

const PeopleDetailsPage = () => {
  const params = useParams();
  const personId = params.personId;
  const [readMore, setReadMore] = useState(false);
  const [selectedTab, setSelectedTab] = useState(CREDITS_TABS[0]);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [jobsList, setJobsList] = useState<string[]>([]);

  const queryParams = {
    append_to_response: 'images,combined_credits',
    include_image_language: 'en,null',
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['people', personId],
    queryFn: () =>
      fetchSingleResult<IPerson>({
        path: `person/${personId}`,
        params: queryParams,
      }),
    retry: 1,
  });

  useEffect(() => {
    if (data?.combined_credits?.crew) {
      const uniqueJobs = [
        ...new Set(
          data.combined_credits.crew.map((crew: ICrewMedia) => crew.job)
        ),
      ];
      setJobsList(uniqueJobs);
      if (uniqueJobs.length > 0) {
        setSelectedJob(uniqueJobs[0]);
      }
    }
  }, [data]);

  const handleSelectTab = (tab: ITabObject) => {
    setSelectedTab(tab);
  };

  const toggleReadMore = () => {
    setReadMore((prevState) => !prevState);
  };

  const handleSelectJob = (job: string) => {
    setSelectedJob(job);
  };

  const profiles = useMemo(() => {
    if (!data?.images?.profiles) return [];
    return data.images.profiles.map((profile: IImage) => ({
      galleryImage: getProfileImage(profile.file_path, 'w185'),
      fullImage: getProfileImage(profile.file_path, 'original'),
    }));
  }, [data]);

  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorPage />;

  return (
    <div className='page-container'>
      <div className={classes.header}>
        <img
          className={classes['profile-img']}
          alt={data.name}
          src={getProfileImage(data.profile_path, 'h632')}
        />
        <div>
          <h1 className={classes.name}>{data.name}</h1>
          <p>Know for {data.known_for_department}</p>
          <p>
            Born {formatDate(data.birthday)}
            {data.birthday &&
              ` (${moment().diff(data.birthday, 'years')} years old)`}
          </p>
          {data.deathday && (
            <>
              <p>Died {formatDate(data.deathday)}</p>
            </>
          )}
          <p>Born in {data.place_of_birth || 'Unknown'}</p>
          <p
            className={`${classes.biography} ${
              readMore ? '' : classes['read-more']
            }`}
          >
            {data.biography || 'Biography not available'}
          </p>
          {data.biography && (
            <button className={classes['btn-more']} onClick={toggleReadMore}>
              {readMore ? 'Less' : 'More'}
              {readMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          )}
        </div>
      </div>
      <div className={classes['main-content']}>
        {/* {profileList && profileList.length > 0 && (
          <ImageList
            images={profiles}
            backdropList={profileList}
            title={data.name}
            image={getProfileImage(data.profile_path, 'w185')}
          />
        )} */}

        <div className={classes['combined-credits']}>
          <Tabs
            onSelectType={handleSelectTab}
            selectedType={selectedTab}
            tabs={CREDITS_TABS}
            layoutId='credits_page'
          />

          {selectedTab.value === MOVIE_TYPE && (
            <MediaItems
              media={data.combined_credits.cast.filter(
                (item) => item.media_type === MOVIE_TYPE
              )}
            />
          )}
          {selectedTab.value === 'tv' && (
            <MediaItems
              media={data.combined_credits.cast.filter(
                (item) => item.media_type === 'tv'
              )}
            />
          )}
          {selectedTab.value === 'crew' && (
            <>
              <TagsList
                tagsList={jobsList}
                handleSelectTag={handleSelectJob}
                selectedTag={selectedJob}
              />
              <MediaItems
                media={data.combined_credits.crew.filter(
                  (item) => item.job === selectedJob
                )}
              />
            </>
          )}

          {selectedTab.value === 'images' && (
            <div className='grid--5-cols'>
              {profiles.map((image) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailsPage;
