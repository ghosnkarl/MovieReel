import { NavLink } from 'react-router-dom';
import {
  CollectionInterface,
  ProductionCompanyInterface,
} from '../../../models/mediaModel';
import classes from './media-details.module.css';
import MediaDetailsItem from './MediaDetailsItem';
import Section from '../../section/Section';

interface SidebarProps {
  status: string;
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompanyInterface[];
  budget: number;
  revenue: number;
  keywords: { id: number; name: string }[];
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
  keywords,
  tagline,
  collection,
}: SidebarProps) => {
  const formattedRevenue =
    revenue === 0 ? '-' : `$ ${revenue.toLocaleString('en-US')}`;
  const formattedBudget =
    budget === 0 ? '-' : `$ ${budget.toLocaleString('en-US')}`;

  return (
    <Section>
      <h1 className='homepage-title'>Details</h1>
      <div className={classes.details}>
        <div className={classes['details__left']}>
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

          <MediaDetailsItem title='Budget' text={formattedBudget} />
          <MediaDetailsItem title='Revenue' text={formattedRevenue} />
        </div>

        {keywords && keywords.length > 0 && (
          <div>
            <h2>Keywords</h2>
            <div className={classes['keywords']}>
              {keywords.map((keyword) => (
                <span key={keyword.id}>{keyword.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default MediaDetails;
