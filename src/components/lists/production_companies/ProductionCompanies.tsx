import { NavLink } from 'react-router-dom';
import { IIdName } from '../../../models/commonModel';
import HorizontalListContainer from '../../horizontal_list/HorizontalListContainer';
import classes from './ProductionCompanies.module.css';

interface IProductionCompanies {
  production_companies: IIdName[];
}

const ProductionCompanies = ({
  production_companies,
}: IProductionCompanies) => {
  return (
    <HorizontalListContainer
      title='Production Companies'
      link={null}
      linkState={null}
    >
      {production_companies &&
        production_companies.map((company) => (
          <li className={classes.item} key={company.id}>
            <NavLink to={`/${company.id}`} className={classes.title}>
              {company.name}
            </NavLink>
          </li>
        ))}
    </HorizontalListContainer>
  );
};

export default ProductionCompanies;
