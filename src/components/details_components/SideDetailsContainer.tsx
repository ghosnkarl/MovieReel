import { IMovieDetails } from '../../models/movieModel';
import classes from '../../styles/movie-details.module.css';
import Keywords from '../Keywords';
import DetailsReviews from './DetailsReviews';
import MediaDetails from './MediaDetails';

const SideDetailsContainer = ({ movie }: { movie: IMovieDetails }) => {
  return (
    <div className={classes['side__container']}>
      <MediaDetails
        status={movie.status}
        homepage={movie.homepage}
        imdb_id={movie.imdb_id}
        production_companies={movie.production_companies}
        revenue={movie.revenue}
        budget={movie.budget}
        tagline={movie.tagline}
        collection={movie.belongs_to_collection}
      />
      <Keywords keywords={movie.keywords.keywords} />

      <DetailsReviews
        reviews={movie.reviews}
        title={movie.title}
        poster_path={movie.poster_path}
      />
    </div>
  );
};

export default SideDetailsContainer;
