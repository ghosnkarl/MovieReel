import classes from './DetailsHeader.module.css';
import { getBackdropImage } from '../../../helpers/imageSizes';
import { IIdName } from '../../../models/commonModel';
import { formatDate } from '../../../helpers/commonHelpers';
import RatingStar from '../../../components/rating/RatingStar';
import Tabs, { ITabObject } from '../../../components/ui/tabs/Tabs';
import { DETAILS_TABS } from '../../../data/tabsData';

interface IDetailsHeader {
  title: string | undefined;
  release_date: string | null | undefined;
  runtime: number | null;
  genres: IIdName[];
  vote_average: number;
  vote_count: number;
  backdrop_path: string | null;
  selectedTab: ITabObject;
  handleSelectTab: (tab: ITabObject) => void;
}

const DetailsHeader = ({
  title,
  release_date,
  runtime,
  genres,
  vote_average,
  backdrop_path,
  vote_count,
  handleSelectTab,
  selectedTab,
}: IDetailsHeader) => {
  const formattedGenres = genres.map((genre) => genre.name).join(' • ');

  const formattedRuntime =
    runtime && runtime !== 0
      ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
      : null;

  return (
    <div className={classes.container}>
      <img
        className={classes['backdrop__img']}
        src={getBackdropImage(backdrop_path, 'w1280')}
        alt={title}
      />

      <div className={classes['bottom__container']}>
        <p className={classes.genres}>{formattedGenres}</p>
        <h1 className={classes.title}>{title}</h1>

        <div className={classes['rating__container']}>
          <RatingStar
            value={vote_average}
            size='medium'
            vote_count={vote_count}
          />
          <p className={classes['date-runtime']}>
            {release_date && `${formatDate(release_date)}`}
            {formattedRuntime && ` • ${formattedRuntime}`}
          </p>
        </div>

        <Tabs
          onSelectType={handleSelectTab}
          selectedType={selectedTab}
          tabs={DETAILS_TABS}
          layoutId='details_page'
        />
      </div>
    </div>
  );
};

export default DetailsHeader;
