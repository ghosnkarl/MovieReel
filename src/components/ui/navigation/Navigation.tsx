import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import logoImg from '../../../assets/tmdb.svg';
import { IoMdSearch } from 'react-icons/io';
import { NAV_LINKS } from '../../../data/navLinks';

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
        <NavLink to='/search' className='link--gradient link--search'>
          <IoMdSearch className={classes.icon} />
          Search
        </NavLink>
      </nav>
    </header>
  );
}
