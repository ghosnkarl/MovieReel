import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../../data/navLinks';
import classes from './MobileNavigation.module.css';
import { MdClose } from 'react-icons/md';
import SearchBarHeader from '../../searchbar/SearchBarHeader';

const MobileNavigation = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const onMenuClicked = (item: (typeof NAV_LINKS)[0]) => {
    navigate(item.link);
    setOpen(false);
  };
  return (
    <div className={`${classes.container} ${open ? classes.open : ''}`}>
      <div className={classes.header}>
        <h1>MovieReel</h1>
        <MdClose className={classes.close} onClick={() => setOpen(false)} />
      </div>

      <div className={classes.searchContainer}>
        <SearchBarHeader setMobileMenuOpen={setOpen} />
      </div>
      <ul className={classes.list}>
        {NAV_LINKS.map((item) => (
          <li key={item.link}>
            <button onClick={() => onMenuClicked(item)}>
              <span className={classes.icon}>{item.icon}</span>

              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MobileNavigation;
