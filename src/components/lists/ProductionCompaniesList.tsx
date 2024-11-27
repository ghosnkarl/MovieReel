import { NavLink } from 'react-router-dom';
import { IIdName } from '../../models/commonModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';
import classes from './production-companies.module.css';

interface IProductionCompaniesList {
  production_companies: IIdName[];
}

const ProductionCompaniesList = ({
  production_companies,
}: IProductionCompaniesList) => {
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

export default ProductionCompaniesList;
