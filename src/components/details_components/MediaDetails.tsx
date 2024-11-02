import { NavLink } from 'react-router-dom';
import classes from '../../styles/media-details.module.css';
import {
  CollectionInterface,
  ProductionCompanyInterface,
} from '../../models/mediaModel';
import Section from '../Section';
import MediaDetailsItem from './MediaDetailsItem';

interface SidebarProps {
  status: string;
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompanyInterface[];
  budget: number;
  revenue: number;
  tagline: string;
  collection: CollectionInterface | null;
}

const MediaDetails = ({
  status,
  homepage,
  imdb_id,
  production_companies,
  budget,
  revenue,
  tagline,
  collection,
}: SidebarProps) => {
  const formattedRevenue =
    revenue === 0 ? '-' : `$ ${revenue.toLocaleString('en-US')}`;
  const formattedBudget =
    budget === 0 ? '-' : `$ ${budget.toLocaleString('en-US')}`;

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

        {production_companies && production_companies.length > 0 && (
          <MediaDetailsItem
            title='Production Companies'
            text={production_companies
              .map((company) => company.name)
              .join(', ')}
          />
        )}

        {budget > 0 && (
          <MediaDetailsItem title='Budget' text={formattedBudget} />
        )}
        {revenue > 0 && (
          <MediaDetailsItem title='Revenue' text={formattedRevenue} />
        )}
      </div>
    </Section>
  );
};

export default MediaDetails;
