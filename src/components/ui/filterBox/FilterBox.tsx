import { ChangeEvent, useState } from 'react';
import classes from './FilterBox.module.css';
import Dropdown, { ItemProps } from '../../dropdown/Dropdown';
import { SORT } from '../../../data/sortOptions';

import Searchbar from '../../searchbar/Searchbar';
import GenresPicker from '../genresPicker/GenresPicker';
import { format } from '../../../helpers/format';

const FilterBox = () => {
  const [selectedSortItem, setSelectedSortItem] = useState<ItemProps>(SORT[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleSearch = () => {
    const filterObj: { [key: string]: string } = {};

    filterObj.sort_by = selectedSortItem.value;

    if (startDate !== '')
      filterObj['primary_release_date.gte'] = format.date(startDate);

    if (endDate !== '')
      filterObj['primary_release_date.lte'] = format.date(endDate);
  };

  return (
    <div className={classes.filterContainer}>
      <div>
        <h1>Filter</h1>
        <Dropdown
          selectedSortItem={selectedSortItem}
          setSelectedSortItem={setSelectedSortItem}
          items={SORT}
        />
      </div>
      <div>
        <h1>Genres</h1>
        <GenresPicker />
      </div>
      <div className={classes.datesContainer}>
        <h1>Release Dates</h1>
        <div>
          <p>From</p>
          <input
            onChange={handleStartDateChange}
            value={startDate}
            type='date'
          />
        </div>
        <div>
          <p>To</p>
          <input
            min={startDate}
            onChange={handleEndDateChange}
            value={endDate}
            type='date'
          />
        </div>
      </div>

      <div>
        <h1>Keywords</h1>
        <Searchbar />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default FilterBox;
