import { NavLink } from 'react-router-dom';
import classes from '../../styles/media-details.module.css';
import Section from '../Section';
import MediaDetailsItem from './MediaDetailsItem';
import { ICollection } from '../../models/collectionModel';
import { ICreatedBy } from '../../models/tvModel';
import moment from 'moment';

import { IProductionCompany } from '../../models/productionCompanyModel';

interface SidebarProps {
  status: string;
  homepage: string;
  imdb_id: string;
  budget: number;
  revenue: number;
  tagline: string;
  collection: ICollection | null;
  number_of_seasons: number | null;
  number_of_episodes: number | null;
  first_air_date: string | null;
  last_air_date: string | null;
  created_by: ICreatedBy[] | null;
  production_companies: IProductionCompany[] | null;
}

// Helper functions for formatting
const formatCurrency = (amount: number) =>
  amount > 0 ? `$ ${amount.toLocaleString('en-US')}` : '-';

const MediaDetails = ({
  status,
  homepage,
  imdb_id,
  budget,
  revenue,
  tagline,
  collection,
  number_of_seasons,
  number_of_episodes,
  first_air_date,
  last_air_date,
  created_by,
  production_companies,
}: SidebarProps) => {
  const formattedCreatedBy = created_by
    ?.map((creators) => creators.name)
    .join(', ');
  return (
    <Section border='top'>
      <h1 className='section__title'>Details</h1>
      <div className={classes.details}>
        {formattedCreatedBy && (
          <MediaDetailsItem title='Created By' text={formattedCreatedBy} />
        )}

        {last_air_date && (
          <MediaDetailsItem
            title='Last Air Date'
            text={moment(last_air_date).format('MMM DD, YYYY')}
          />
        )}
        <MediaDetailsItem title='Status' text={status} />
        <MediaDetailsItem title='Tagline' text={tagline} />

        {collection && (
          <div className={classes['details__left--item']}>
            <h2>Collection</h2>
            <NavLink to={`/`}>{collection.name}</NavLink>
          </div>
        )}

        {production_companies && (
          <div className={classes['details__left--item']}>
            <h2>Production Companies</h2>
            <ul className={classes['production__list']}>
              {production_companies.map((company, index) => (
                <li>
                  <NavLink key={company.id} to={`/`}>
                    {company.name}
                  </NavLink>
                  {index < production_companies.length - 1 && ' • '}
                </li>
              ))}
            </ul>
          </div>
        )}

        {first_air_date && (
          <MediaDetailsItem
            title='First Air Date'
            text={moment(first_air_date).format('MMM DD, YYYY')}
          />
        )}
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

        {number_of_seasons && number_of_seasons > 0 && (
          <MediaDetailsItem title='Seasons' text={number_of_seasons} />
        )}

        {number_of_episodes && number_of_episodes > 0 && (
          <MediaDetailsItem title='Episodes' text={number_of_episodes} />
        )}

        {budget > 0 && (
          <MediaDetailsItem title='Budget' text={formatCurrency(budget)} />
        )}
        {revenue > 0 && (
          <MediaDetailsItem title='Revenue' text={formatCurrency(revenue)} />
        )}
      </div>
    </Section>
  );
};

export default MediaDetails;
