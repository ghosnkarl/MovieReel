import { NavLink } from 'react-router-dom';
import classes from '../../styles/media-details.module.css';
import moment from 'moment';
import { IIdName } from '../../models/commonModel';

interface MediaDetailsItem {
  title: string;
  text: string | number | undefined;
}

const MediaDetailsItem = ({ title, text }: MediaDetailsItem) => {
  if (!text) return null;
  return (
    <div className={classes['details__left--item']}>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
};

interface IMediaDetails {
  status: string;
  homepage: string;
  imdb_id: string | null;
  budget: number | null;
  revenue: number | null;
  tagline: string;
  number_of_seasons: number | null;
  number_of_episodes: number | null;
  first_air_date: string | null;
  last_air_date: string | null;
  created_by: IIdName[] | null;
}

const formatCurrency = (amount: number) =>
  amount > 0 ? `$ ${amount.toLocaleString('en-US')}` : '-';

const MediaDetails = ({
  status,
  homepage,
  imdb_id,
  budget,
  revenue,
  tagline,
  number_of_seasons,
  number_of_episodes,
  first_air_date,
  last_air_date,
  created_by,
}: IMediaDetails) => {
  const formattedCreatedBy = created_by
    ?.map((creators) => creators.name)
    .join(', ');
  return (
    <div>
      <h1 className='section__title'>Details</h1>
      <div className={classes.details}>
        <MediaDetailsItem title='Created By' text={formattedCreatedBy} />

        <MediaDetailsItem
          title='Last Air Date'
          text={
            last_air_date
              ? moment(last_air_date).format('MMM DD, YYYY')
              : undefined
          }
        />

        <MediaDetailsItem title='Status' text={status} />
        <MediaDetailsItem title='Tagline' text={tagline} />

        {/* {production_companies && (
          <div className={classes['details__left--item']}>
            <h2>Production Companies</h2>
            <ul className={classes['production__list']}>
              {production_companies.map((company, index) => (
                <li key={company.id}>
                  <NavLink key={company.id} to={`/`}>
                    {company.name}
                  </NavLink>
                  {index < production_companies.length - 1 && ' • '}
                </li>
              ))}
            </ul>
          </div>
        )} */}

        <MediaDetailsItem
          title='First Air Date'
          text={
            first_air_date
              ? moment(first_air_date).format('MMM DD, YYYY')
              : undefined
          }
        />

        {homepage && (
          <div className={classes['details__left--item']}>
            <h2>Homepage</h2>
            <NavLink target='_blank' to={homepage}>
              {homepage}
            </NavLink>
          </div>
        )}

        {imdb_id && (
          <div className={classes['details__left--item']}>
            <h2>IMDB</h2>
            <NavLink
              target='_blank'
              to={`https://www.imdb.com/title/${imdb_id}`}
            >
              {`https://www.imdb.com/title/${imdb_id}`}
            </NavLink>
          </div>
        )}

        <MediaDetailsItem
          title='Seasons'
          text={
            number_of_seasons && number_of_seasons > 0
              ? number_of_seasons
              : undefined
          }
        />

        <MediaDetailsItem
          title='Episodes'
          text={
            number_of_episodes && number_of_episodes > 0
              ? number_of_episodes
              : undefined
          }
        />

        <MediaDetailsItem
          title='Budget'
          text={budget && budget > 0 ? formatCurrency(budget) : undefined}
        />

        <MediaDetailsItem
          title='Revenue'
          text={revenue && revenue > 0 ? formatCurrency(revenue) : undefined}
        />
      </div>
    </div>
  );
};

export default MediaDetails;
