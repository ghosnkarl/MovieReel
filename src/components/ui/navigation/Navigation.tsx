import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';
import { NAV_LINKS } from '../../../data/navLinks';
import SearchBarHeader from '../../searchbar/SearchBarHeader';
import { MdMenu, MdSearch } from 'react-icons/md';
import MobileNavigation from '../mobile_navigation/MobileNavigation';
import { useState } from 'react';
import logo from '/logo.svg';

const NavigationItem = ({ item }: { item: (typeof NAV_LINKS)[0] }) => {
  return (
    <li key={item.link}>
      <NavLink
        to={item.link}
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        <span className={classes.icon}>{item.icon}</span>

        {item.title}
      </NavLink>
    </li>
  );
};

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <header className={classes.header}>
      <div className={classes['header__content']}>
        <div className={classes['logo__container']}>
          <img src={logo} alt='MovieReel logo' />
          <MdMenu
            className={classes['menu__icon']}
            onClick={toggleMobileMenu}
          />
        </div>
        <nav className={classes.navigation}>
          <ul className={classes.list}>
            {NAV_LINKS.map((item) => (
              <NavigationItem key={item.title} item={item} />
            ))}
          </ul>
        </nav>
        <div className={classes['search__container']}>
          <SearchBarHeader />
        </div>
        <MdSearch className={classes.search__icon} onClick={toggleMobileMenu} />
      </div>

      <div
        className={`${classes.overlay} ${
          !mobileMenuOpen ? classes.hidden : ''
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <MobileNavigation open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
    </header>
  );
}
