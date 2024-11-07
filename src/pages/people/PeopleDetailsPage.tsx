import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSingleResult } from '../../services/http';
import { getProfileImage } from '../../helpers/imageSizes';
import classes from '../../styles/people-details.module.css';
import { useState } from 'react';
import moment from 'moment';
import ImageList from '../../components/details_components/ImageList';
import MediaItem from '../../components/MediaItem';
import { CREDITS_TABS } from '../../data/data';
import Tabs, { TabObjectProps } from '../../components/Tabs';
import { ICastMedia, ICrewMedia } from '../../models/peopleModel';
import { IImage } from '../../models/imageModel';

const PeopleDetailsPage = () => {
  const params = useParams();
  const personId = params.personId;
  const [readMore, setReadMore] = useState(false);
  const queryParams = {
    append_to_response: 'images,combined_credits',
    include_image_language: 'en,null',
  };

  const tabs: TabObjectProps[] = CREDITS_TABS;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleSelectTab = (tab: TabObjectProps) => {
    setSelectedTab(tab);
  };

  const { data } = useQuery({
    queryKey: ['people', personId],
    queryFn: () =>
      fetchSingleResult({ path: `person/${personId}`, params: queryParams }),
    retry: 1,
  });

  const toggleReadMore = () => {
    setReadMore((prevState) => !prevState);
  };

  if (!data) return;

  let profileList = [...data.images.profiles];
  if (profileList.length > 8) profileList = profileList.slice(0, 8);

  let profiles: { galleryImage: string; fullImage: string }[] = [];
  if (data.images && data.images.profiles && data.images.profiles.length > 0)
    profiles = data.images.profiles.map((profile: IImage) => {
      return {
        galleryImage: getProfileImage(profile.file_path, 'w185'),
        fullImage: getProfileImage(profile.file_path, 'original'),
      };
    });

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        {data && (
          <img
            className={classes['profile-img']}
            alt={data.name}
            src={getProfileImage(data.profile_path, 'h632')}
          />
        )}

        <h2>Known For</h2>
        <p>{data?.known_for_department}</p>
        <h2>Birthday</h2>
        <p>
          {moment(data?.birthday).format('MMMM DD, YYYY')} (
          {moment().diff(data?.birthday, 'years')} years old)
        </p>
        {data?.deathday && (
          <>
            <h2>Deathday</h2>
            <p>{moment(data?.deathday).format('MMMM DD, YYYY')}</p>
          </>
        )}

        <h2>Place of Birth</h2>
        <p>{data?.place_of_birth}</p>
      </div>
      <div className={classes['main-content']}>
        <h1 className={classes.name}>{data?.name}</h1>
        <h1 className='section__title'>Biography</h1>
        <p
          className={`${classes.biography} ${
            readMore ? '' : classes['read-more']
          }`}
        >
          {data?.biography}
        </p>
        <button className={classes['btn-more']} onClick={toggleReadMore}>
          <strong>Read {readMore ? 'Less' : 'More'}</strong>
        </button>

        {profileList && profileList.length > 0 && (
          <ImageList
            images={profiles}
            backdropList={profileList}
            title={data.name}
            image={getProfileImage(data.profile_path, 'w185')}
          />
        )}

        <div className={classes['combined-credits']}>
          <h2 className='section__title'>Movies &amp; TV Shows</h2>
          <Tabs
            onSelectType={handleSelectTab}
            selectedType={selectedTab}
            tabs={tabs}
            layoutId='credits_page'
          />

          {selectedTab.value === 'cast' && (
            <div className='flex--wrap-container'>
              {data.combined_credits.cast.map((castMedia: ICastMedia) => (
                <MediaItem
                  key={castMedia.credit_id}
                  id={castMedia.id}
                  title={castMedia.title || castMedia.name}
                  type={castMedia.media_type === 'movie' ? 'movies' : 'tv'}
                  poster_path={castMedia.poster_path}
                  text={castMedia.character}
                  vote_average={castMedia.vote_average}
                />
              ))}
            </div>
          )}
          {selectedTab.value === 'crew' && (
            <div className='flex--wrap-container'>
              {data.combined_credits.crew.map((crewMedia: ICrewMedia) => (
                <MediaItem
                  key={crewMedia.credit_id}
                  id={crewMedia.id}
                  title={crewMedia.title || crewMedia.name}
                  type={crewMedia.media_type === 'movie' ? 'movies' : 'tv'}
                  poster_path={crewMedia.poster_path}
                  text={crewMedia.job}
                  vote_average={crewMedia.vote_average}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailsPage;
