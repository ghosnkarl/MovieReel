import { useLocation } from 'react-router-dom';
import { ISeason } from '../../models/tvModel';
import classes from '../../styles/seasons-page.module.css';
import SeasonItem from '../../components/SeasonItem';

const SeasonsPage = () => {
  const location = useLocation();
  const seasons = location.state.seasons as ISeason[];
  return (
    <ul className={classes.container}>
      {seasons.map((season) => (
        <li key={season.id}>
          <SeasonItem season={season} isListItem={true} />
        </li>
      ))}
    </ul>
  );
};

export default SeasonsPage;
