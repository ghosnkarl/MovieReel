import Section from './Section';
import classes from '../styles/production-companies.module.css';
import { IProductionCompany } from '../models/productionCompanyModel';
const ProductionCompanies = ({
  production_companies,
}: {
  production_companies: IProductionCompany[];
}) => {
  return (
    <>
      {production_companies && production_companies.length > 0 && (
        <Section border='top'>
          <h1 className='section__title'>Production Companies</h1>
          <ul className={classes.container}>
            {production_companies.map((company) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
};

export default ProductionCompanies;
