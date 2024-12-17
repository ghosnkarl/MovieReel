import classes from './DiscoverPage.module.css';
import { FaSearch } from 'react-icons/fa';

export default function DiscoverPage() {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <FaSearch className={classes.icon} />
        <h1 className={classes.title}>Discover is Coming Soon</h1>
        <p className={classes.description}>
          Get ready for advanced filtering and deep search to find your favorite
          movies and TV shows effortlessly.
        </p>
        <div className={classes.loader}></div>
      </div>
    </div>
  );
}
