import { NavLink } from 'react-router-dom';
import classes from '../../styles/media-details.module.css';

import Section from '../Section';
import MediaDetailsItem from './MediaDetailsItem';
import { IProductionCompany } from '../../models/productionCompanyModel';
import { ICollection } from '../../models/collectionModel';

interface SidebarProps {
  status: string;
  homepage: string;
  imdb_id: string;
  production_companies: IProductionCompany[];
  budget: number;
  revenue: number;
  tagline: string;
  collection: ICollection | null;
  number_of_seasons: number | null;
  number_of_episodes: number | null;
}

// Helper functions for formatting
const formatCurrency = (amount: number) =>
  amount > 0 ? `$ ${amount.toLocaleString('en-US')}` : '-';

const MediaDetails = ({
  status,
  homepage,
  imdb_id,
  production_companies,
  budget,
  revenue,
  tagline,
  collection,
  number_of_seasons,
  number_of_episodes,
}: SidebarProps) => {
  return (
    <Section border='top'>
      <h1 className='section__title'>Details</h1>
      <div className={classes.details}>
        <MediaDetailsItem title='Status' text={status} />
        <MediaDetailsItem title='Tagline' text={tagline} />

        {collection && (
          <div className={classes['details__left--item']}>
            <h2>Collection</h2>
            <NavLink to={`/`}>{collection.name}</NavLink>
          </div>
        )}

        {homepage && (
          <div className={classes['details__left--item']}>
            <h2>Links</h2>
            <div className={classes.links}>
              <NavLink target='_blank' to={homepage}>
                Homepage
              </NavLink>
              {' • '}
              <NavLink
                target='_blank'
                to={`https://www.imdb.com/title/${imdb_id}`}
              >
                IMDB
              </NavLink>
            </div>
          </div>
        )}

        {number_of_seasons && number_of_seasons > 0 && (
          <MediaDetailsItem title='Seasons' text={number_of_seasons} />
        )}

        {number_of_episodes && number_of_episodes > 0 && (
          <MediaDetailsItem title='Episodes' text={number_of_episodes} />
        )}

        {production_companies && production_companies.length > 0 && (
          <MediaDetailsItem
            title='Production Companies'
            text={production_companies
              .map((company) => company.name)
              .join(', ')}
          />
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
