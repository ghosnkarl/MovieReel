import { NavLink } from 'react-router-dom';
import classes from './DetailsMedia.module.css';
import { IIdName } from '../../models/commonModel';
import { formatDate } from '../../helpers/commonHelpers';
import Keywords from '../../components/lists/keywords_list/KeywordsList';

interface MediaDetailsItem {
  title: string;
  text: string | number | undefined;
}

const DetailsMediaItem = ({ title, text }: MediaDetailsItem) => {
  if (!text) return null;
  return (
    <div className={classes['details__left--item']}>
      <p className={classes['details__title']}>{title}</p>
      <p className={classes['details__text']}>{text}</p>
    </div>
  );
};

interface IMediaDetails {
  status: string;
  homepage: string;
  imdb_id: string | null | undefined;
  budget: number | null | undefined;
  revenue: number | null | undefined;
  number_of_seasons: number | null | undefined;
  number_of_episodes: number | null | undefined;
  first_air_date: string | null | undefined;
  last_air_date: string | null | undefined;
  created_by: IIdName[] | null | undefined;
  production_companies: IIdName[] | null;
  keywords: IIdName[] | null;
  tagline: string | undefined;
}

const formatCurrency = (amount: number) =>
  amount > 0 ? `$ ${amount.toLocaleString('en-US')}` : '-';

const DetailsMedia = ({
  status,
  homepage,
  imdb_id,
  budget,
  revenue,
  number_of_seasons,
  number_of_episodes,
  first_air_date,
  last_air_date,
  created_by,
  production_companies,
  keywords,
  tagline,
}: IMediaDetails) => {
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

        <DetailsMediaItem title='Status' text={status} />

        <DetailsMediaItem title='Tagline' text={tagline} />

        {last_air_date && (
          <DetailsMediaItem
            title='Last Air Date'
            text={formatDate(last_air_date)}
          />
        )}

        {first_air_date && (
          <DetailsMediaItem
            title='First Air Date'
            text={formatDate(first_air_date)}
          />
        )}

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

        <div className={classes['details__left--item']}>
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
        <div className={classes['details__left--item']}>
          <p className={classes['details__title']}>Production Companies</p>
          {production_companies && (
            <div className={classes['links__container']}>
              {production_companies.map((company) => (
                <NavLink
                  className={classes['external__link']}
                  key={company.id}
                  to={`https://www.imdb.com/title/${imdb_id}`}
                >
                  {company.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
      <Keywords keywords={keywords} />
    </div>
  );
};

export default DetailsMedia;
