import { IMovieDetails } from '../../models/movieModel';
import { ITVDetails } from '../../models/tvModel';
import classes from '../../styles/movie-details.module.css';
import Keywords from '../Keywords';
import ProductionCompanies from '../ProductionCompanies';
import DetailsReviews from './DetailsReviews';
import MediaDetails from './MediaDetails';

const SideDetailsContainer = ({
  media,
}: {
  media: IMovieDetails | ITVDetails;
}) => {
  const isMovie = 'title' in media;

  return (
    <div className={classes['side__container']}>
      <MediaDetails
        status={media.status}
        homepage={media.homepage}
        imdb_id={media.imdb_id}
        revenue={media.revenue}
        budget={media.budget}
        tagline={media.tagline}
        collection={isMovie ? media.belongs_to_collection : null}
        number_of_episodes={isMovie ? null : media.number_of_episodes}
        number_of_seasons={isMovie ? null : media.number_of_seasons}
        first_air_date={isMovie ? null : media.first_air_date}
        last_air_date={isMovie ? null : media.last_air_date}
        created_by={isMovie ? null : media.created_by}
      />

      <div>
        <ProductionCompanies
          production_companies={media.production_companies}
        />
        <Keywords
          keywords={isMovie ? media.keywords.keywords : media.keywords.results}
        />
      </div>
    </div>
  );
};

export default SideDetailsContainer;
