import { ChangeEvent, useRef, useState } from 'react';
import classes from '@/components/searchbar/Searchbar.module.css';
import SearchTag from '@/components/searchbar/SearchTag';
import { IBaseIdName } from '@/models/commonModel';
import useSearch from '@/hooks/useSearch';

const Searchbar = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const lastChange = useRef<ReturnType<typeof setInterval> | null>(null);
  const [searchList, setSearchList] = useState<{ id: number; name: string }[]>(
    []
  );

  const { data } = useSearch({ value: 'keyword', query: searchTerm });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }
    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setOpen(e.target.value !== '');
      setSearchTerm(e.target.value);
    }, 500);
  };

  const handleSearchClick = (item: IBaseIdName) => {
    if (!searchList.find((keyword) => keyword.id === item.id))
      setSearchList([...searchList, item]);

    setOpen(false);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const handleRemoveTag = (id: number) => {
    const newList = searchList.filter((item) => item.id !== id);
    setSearchList(newList);
  };

  return (
    <div className={classes.searchContainer}>
      <div className={classes.container}>
        <div className={classes.tagsContainer}>
          {searchList &&
            searchList.map((keyword) => (
              <SearchTag
                onRemoveTag={() => handleRemoveTag(keyword.id)}
                key={keyword.id}
                title={keyword.name}
              />
            ))}
        </div>
        <input
          ref={inputRef}
          type='text'
          placeholder='Search'
          onChange={handleChange}
        />
        <div
          className={`${classes.dropdownContent} ${
            open ? classes.contentOpen : ''
          }`}
        >
          {data &&
            (data.results as IBaseIdName[]).map((item) => (
              <p
                onClick={() => handleSearchClick(item)}
                className={classes.searchItem}
                key={item.id}
              >
                {item.name}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
