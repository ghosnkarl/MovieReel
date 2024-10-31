import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../helpers/data';
import classes from './navigation.module.css';
import logoImg from '../../assets/tmdb.svg';

import { IoMdSearch } from 'react-icons/io';

export default function Navigation() {
  return (
    <header className={classes.header}>
      <nav>
        <NavLink to='/' end>
          <img src={logoImg} alt='Logo' />
        </NavLink>

        <ul className={classes['nav-list']}>
          {NAV_LINKS.map((item) => (
            <li key={item.link}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <NavLink to='/search' className={classes['search-btn']}>
          <IoMdSearch className={classes.icon} />
          Search
        </NavLink>
      </nav>
    </header>
  );
}
