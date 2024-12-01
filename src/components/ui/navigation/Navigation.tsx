import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import logoImg from '../../../assets/tmdb.svg';
import { IoMdSearch } from 'react-icons/io';
import { NAV_LINKS } from '../../../data/navLinks';

const NavigationItem = ({ item }: { item: (typeof NAV_LINKS)[0] }) => {
  return (
    <li key={item.link}>
      <NavLink
        to={item.link}
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        {item.title}
      </NavLink>
    </li>
  );
};

export default function Navigation() {
  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <NavLink to='/' end>
          <img className={classes.logo} src={logoImg} alt='Logo' />
        </NavLink>

        <ul className={classes.list}>
          {NAV_LINKS.map((item) => (
            <NavigationItem key={item.title} item={item} />
          ))}
        </ul>
        <NavLink to='/search' className='link--gradient link--search'>
          <IoMdSearch className={classes['search-icon']} />
          Search
        </NavLink>
      </nav>
    </header>
  );
}
