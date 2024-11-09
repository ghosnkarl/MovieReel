import { IMovieDetails } from '../../models/movieModel';
import { ITVDetails } from '../../models/tvModel';
import classes from '../../styles/movie-details.module.css';
import Keywords from '../Keywords';
import DetailsReviews from './DetailsReviews';
import MediaDetails from './MediaDetails';

const SideDetailsContainer = ({
  media,
}: {
  media: IMovieDetails | ITVDetails;
}) => {
  const title = 'title' in media ? media.title : media.name;
  const keywords =
    'title' in media ? media.keywords.keywords : media.keywords.results;
  return (
    <aside className={classes['side__container']}>
      <MediaDetails
        status={media.status}
        homepage={media.homepage}
        imdb_id={media.imdb_id}
        production_companies={media.production_companies}
        revenue={media.revenue}
        budget={media.budget}
        tagline={media.tagline}
        collection={null}
      />
      <Keywords keywords={keywords} />

      <DetailsReviews
        reviews={media.reviews}
        title={title}
        poster_path={media.poster_path}
      />
    </aside>
  );
};

export default SideDetailsContainer;
