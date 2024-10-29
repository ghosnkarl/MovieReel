import { NavLink } from "react-router-dom";
import {
  CollectionInterface,
  ProductionCompanyInterface,
} from "../../../models/mediaModel";
import classes from "./sidebar-details.module.css";

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

const SidebarDetails = ({
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
    revenue === 0 ? "-" : `$ ${revenue.toLocaleString("en-US")}`;
  const formattedBudget =
    budget === 0 ? "-" : `$ ${budget.toLocaleString("en-US")}`;

  return (
    <div>
      <h1 className="homepage-title">Details</h1>
      <div className={classes["side-container"]}>
        <div className={classes["details-container"]}>
          <div className={classes["details-container--item"]}>
            <h2>Status</h2>
            <p>{status}</p>
          </div>
          <div className={classes["details-container--item"]}>
            <h2>Tagline</h2>
            <p>{tagline}</p>
          </div>

          {collection && (
            <div className={classes["details-container--item"]}>
              <h2>Collection</h2>
              <NavLink to={`/`}>{collection.name}</NavLink>
            </div>
          )}

          {homepage && (
            <div className={classes["details-container--item"]}>
              <h2>Links</h2>
              <div className={classes["links-container"]}>
                <NavLink target="_blank" to={homepage}>
                  Homepage
                </NavLink>
                {" • "}
                <NavLink
                  target="_blank"
                  to={`https://www.imdb.com/title/${imdb_id}`}
                >
                  IMDB
                </NavLink>
              </div>
            </div>
          )}

          {production_companies && production_companies.length > 0 && (
            <div className={classes["details-container--item"]}>
              <h2>Production Companies</h2>
              <p>
                {production_companies.map((company) => company.name).join(", ")}
              </p>
            </div>
          )}

          <div className={classes["details-container--item"]}>
            <h2>Budget</h2>
            <p>{formattedBudget}</p>
          </div>
          <div className={classes["details-container--item"]}>
            <h2>Revenue</h2>
            <p>{formattedRevenue}</p>
          </div>
        </div>
        <div>
          {keywords && keywords.length > 0 && (
            <>
              <h2>Keywords</h2>
              <div className={classes["keywords-container"]}>
                {keywords.map((keyword) => (
                  <span key={keyword.id}>{keyword.name}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarDetails;
