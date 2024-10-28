import { ChangeEvent, useRef, useState } from "react";
import classes from "./searchbar.module.css";
import SearchTag from "./SearchTag";
import { useQuery } from "@tanstack/react-query";
import { search } from "../../services/http";
import { KeywordInterface } from "../../models/keywordModel";

const Searchbar = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const lastChange = useRef<ReturnType<typeof setInterval> | null>(null);
  const [searchList, setSearchList] = useState<{ id: number; name: string }[]>(
    []
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["keywords", { search: searchTerm }],
    queryFn: () => search("keyword", searchTerm),
    retry: 1,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }
    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setOpen(e.target.value !== "");
      setSearchTerm(e.target.value);
    }, 500);
  };

  const handleSearchClick = (item: KeywordInterface) => {
    if (!searchList.find((keyword) => keyword.id === item.id))
      setSearchList([...searchList, item]);

    setOpen(false);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const handleRemoveTag = (id: number) => {
    const newList = searchList.filter((item) => item.id !== id);
    setSearchList(newList);
  };

  return (
    <div className={classes["search-container"]}>
      <div className={classes.container}>
        <div className={classes["tags-container"]}>
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
          type="text"
          placeholder="Search Keywords"
          onChange={handleChange}
        />
        <div
          className={`${classes["dropdown-content"]} ${
            open ? classes["content-open"] : ""
          }`}
        >
          {data &&
            data.map((item: KeywordInterface) => (
              <p
                onClick={() => handleSearchClick(item)}
                className={classes["search-item"]}
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
