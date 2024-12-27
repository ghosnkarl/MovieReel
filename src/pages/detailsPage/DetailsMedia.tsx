import { NavLink } from 'react-router-dom';
import classes from './DetailsMedia.module.css';
import KeywordsList from '../../components/lists/keywordList/KeywordsList';
import DetailsMediaItem from '../../components/detailsMediaItem/DetailsMediaItem';
import { IDetails } from '../../models/detailsModel';
import LinksList from '../../components/lists/linksList/LinksList';

interface IMediaDetails {
  media: IDetails;
}

const formatCurrency = (amount: number) =>
  amount > 0 ? `$ ${amount.toLocaleString('en-US')}` : '-';

const DetailsMedia = ({ media }: IMediaDetails) => {
  const {
    created_by,
    homepage,
    imdb_id,
    budget,
    revenue,
    number_of_seasons,
    number_of_episodes,
    production_companies,
    keywords,
    networks,
  } = media;
  const formattedCreatedBy = created_by
    ?.map((creators) => creators.name)
    .join(', ');

  const seasons =
    number_of_seasons && number_of_seasons > 0 ? number_of_seasons : undefined;
  const episodes =
    number_of_episodes && number_of_episodes > 0
      ? number_of_episodes
      : undefined;

  return (
    <div className={classes.container}>
      <h1 className='section__title'>Details</h1>
      <div className={classes.details}>
        <DetailsMediaItem title='Created By' text={formattedCreatedBy} />

        {number_of_seasons && number_of_episodes && (
          <DetailsMediaItem
            title='Episodes'
            text={`${seasons} seasons | ${episodes} episodes`}
          />
        )}

        <DetailsMediaItem
          title='Budget'
          text={budget && budget > 0 ? formatCurrency(budget) : 'Not specified'}
        />

        <DetailsMediaItem
          title='Revenue'
          text={
            revenue && revenue > 0 ? formatCurrency(revenue) : 'Not specified'
          }
        />

        <div>
          <p className={classes['details__title']}>External Links</p>
          <div className={classes['links__container']}>
            {!homepage && !imdb_id && (
              <p className={classes['details__text']}>Not specified</p>
            )}
            {homepage && (
              <NavLink
                className={classes['external__link']}
                target='_blank'
                to={homepage}
              >
                Homepage
              </NavLink>
            )}

            {imdb_id && (
              <NavLink
                className={classes['external__link']}
                target='_blank'
                to={`https://www.imdb.com/title/${imdb_id}`}
              >
                IMDB
              </NavLink>
            )}
          </div>
        </div>
        <LinksList links={production_companies} title='Production Companies' />
        <LinksList links={networks} title='Networks' />
      </div>

      <KeywordsList
        keywords={'title' in media ? keywords.keywords : keywords.results}
      />
    </div>
  );
};

export default DetailsMedia;
