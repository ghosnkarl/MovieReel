import classes from '../../styles/people-item.module.css';
import { PeopleListInterface } from '../../models/peopleModel';
import { NavLink } from 'react-router-dom';

const PeopleList = ({ data }: { data: PeopleListInterface[] }) => {
  return (
    <>
      {data.map((item) => {
        return (
          <NavLink
            key={item.id}
            to={`/people/${item.id}`}
            className={classes.container}
          >
            <img
              src={`http://image.tmdb.org/t/p/w185/${item.profile_path}`}
              alt='travel image'
            />
            <h2>{item.name}</h2>
          </NavLink>
        );
      })}
    </>
  );
};

export default PeopleList;
