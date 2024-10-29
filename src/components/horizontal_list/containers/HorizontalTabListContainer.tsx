import { useQuery } from "@tanstack/react-query";
import MediaList from "../MediaList";
import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "../../ui/LoadingIndicator";
import ErrorBlock from "../../ui/ErrorBlock";
import ListTabs, { TabOjectProps } from "../../tabs/ListTabs";
import classes from "./horizontal-tab-list.module.css";
import PeopleList from "../PeopleList";
import { MediaListInterface } from "../../../models/mediaModel";
import { PeopleListInterface } from "../../../models/peopleModel";
import ListArrows from "../arrows/ListArrows";

export interface HorizontalContainerProps {
  queryStr: string;
  tabs: TabOjectProps[];
  title: string;
  type: "movies" | "tv" | "people";
}

export default function HorizontalTabListContainer({
  queryStr,
  tabs,
  title,
  type,
}: HorizontalContainerProps) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const listRef = useRef<HTMLUListElement>(null);
  const [ref, setRef] = useState<HTMLUListElement | null>(null);

  useEffect(() => {
    setRef(listRef.current);
  }, [listRef]);

  const handleSelectTab = (tab: TabOjectProps) => {
    setSelectedTab(tab);
  };

  const { data, isError, error, refetch } = useQuery({
    queryKey: [queryStr, selectedTab.value],
    queryFn: () => selectedTab.query,
    retry: 1,
  });

  let content = <LoadingIndicator title={`Fetching ${title}...`} />;

  if (data && type !== "people") {
    content = <MediaList type={type} data={data as MediaListInterface[]} />;
  }

  if (data && type === "people") {
    content = <PeopleList data={data as PeopleListInterface[]} />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title={`Error Fetching ${title}`}
        message={error.message.status_message}
        onTryAgainClick={refetch}
      />
    );
  }

  return (
    <div>
      <div className={classes["list-header"]}>
        <div className={classes["list-header--left"]}>
          <h1 className="homepage-title">{title}</h1>
          {data && tabs && tabs.length > 1 && (
            <ListTabs
              onSelectType={handleSelectTab}
              selectedType={selectedTab}
              tabs={tabs}
              layoutId={title}
            />
          )}
        </div>
        <ListArrows listRef={ref} />
      </div>
      <ul ref={listRef} className={classes.list}>
        {content}
      </ul>
    </div>
  );
}