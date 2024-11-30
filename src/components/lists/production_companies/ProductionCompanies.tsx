import { NavLink } from 'react-router-dom';
import { IIdName } from '../../../models/commonModel';
import HorizontalList from '../../horizontal_list/HorizontalList';
import classes from './ProductionCompanies.module.css';

interface IProductionCompanies {
  production_companies: IIdName[];
}

const ProductionCompanies = ({
  production_companies,
}: IProductionCompanies) => {
  return (
    <HorizontalList title='Production Companies' link={null} linkState={null}>
      {production_companies &&
        production_companies.map((company) => (
          <li className={classes.item} key={company.id}>
            <NavLink to={`/${company.id}`} className={classes.title}>
              {company.name}
            </NavLink>
          </li>
        ))}
    </HorizontalList>
  );
};

export default ProductionCompanies;
