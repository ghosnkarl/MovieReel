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
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';
import MediaItem from '../MediaItem';

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
  const title = 'title' in media ? media.title : media.name;
  const credits = 'title' in media ? media.credits : media.aggregate_credits;
  const seasons = 'title' in media ? null : media.seasons;

  return (
    <div className={classes['main-container']}>
      {credits && (
        <CastList
          title={title}
          image={getPosterImage(media.poster_path, 'w342')}
          credits={credits}
        />
      )}

      {seasons && seasons.length > 0 && (
        <HorizontalListContainer
          title='Seasons'
          linkState={{
            title,
            image: getPosterImage(media.poster_path, 'w342'),
            seasons,
          }}
          link='seasons'
        >
          {seasons.map((season) => (
            <MediaItem
              id={season.id}
              key={season.id}
              title={`${season.season_number} - ${season.name}`}
              poster_path={getPosterImage(season.poster_path, 'w342')}
              text={`${season.episode_count} episodes`}
              type='season'
              vote_average={season.vote_average}
            />
          ))}
        </HorizontalListContainer>
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
