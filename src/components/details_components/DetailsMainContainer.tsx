import { useQuery } from '@tanstack/react-query';
import { getGalleryImages } from '../../helpers/galleryImages';
import classes from '../../styles/movie-details.module.css';
import { fetchGenres } from '../../services/http';
import VideoList from './VideoList';
import ImageList from './ImageList';
import RecommendedList from './RecommendedList';
import { getPosterImage } from '../../helpers/imageSizes';
import CastList from './CastList';
import { IMovieDetails } from '../../models/movieModel';
import { ITVDetails } from '../../models/tvModel';
import Section from '../Section';
import SeasonItem from '../SeasonItem';

import HeaderLink from '../HeaderLink';

const DetailsMainContainer = ({
  media,
}: {
  media: IMovieDetails | ITVDetails;
}) => {
  const genresResult = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: () => fetchGenres('movie'),
    retry: 1,
  });

  const images = getGalleryImages({ images: media.images });
  const isMovie = 'title' in media;
  const title = isMovie ? media.title : media.name;
  const credits = isMovie ? media.credits : media.aggregate_credits;
  const seasons = isMovie ? null : media.seasons;
  const number_of_seasons = isMovie ? null : media.number_of_seasons;

  let lastSeason = null;

  if (!isMovie && media.seasons && media.seasons.length > 0)
    lastSeason = media.seasons[media.seasons.length - 1];

  return (
    <div className={classes['main-container']}>
      {credits && (
        <CastList
          title={title}
          image={getPosterImage(media.poster_path, 'w342')}
          credits={credits}
        />
      )}

      {lastSeason && (
        <Section border='left'>
          <HeaderLink
            title='Seasons'
            linkState={{
              title,
              image: getPosterImage(media.poster_path, 'w342'),
              seasons,
              number_of_seasons,
            }}
            link='seasons'
          />

          <SeasonItem season={lastSeason} isListItem={false} />
        </Section>
      )}

      {media.videos.results && media.videos.results.length > 0 && (
        <VideoList videos={media.videos.results} />
      )}

      <ImageList
        images={images}
        backdropList={media.images.backdrops}
        title={title}
        image={getPosterImage(media.poster_path, 'w342')}
      />

      <RecommendedList
        title={title}
        items={media.recommendations.results}
        genreList={genresResult.data}
      />
    </div>
  );
};

export default DetailsMainContainer;
