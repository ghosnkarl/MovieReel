import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../../data/navLinks';
import classes from './MobileNavigation.module.css';
import { MdClose } from 'react-icons/md';

const NavigationItem = ({ item }: { item: (typeof NAV_LINKS)[0] }) => {
  return (
    <li key={item.link}>
      <NavLink to={item.link}>
        <span className={classes.icon}>{item.icon}</span>

        {item.title}
      </NavLink>
    </li>
  );
};
const MobileNavigation = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={`${classes.container} ${open ? classes.open : ''}`}>
      <MdClose className={classes.close} onClick={() => setOpen(false)} />
      <ul className={classes.list}>
        {NAV_LINKS.map((item) => (
          <NavigationItem key={item.title} item={item} />
        ))}
      </ul>
    </div>
  );
};
export default MobileNavigation;
