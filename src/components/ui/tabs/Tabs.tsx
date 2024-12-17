import { MouseEventHandler, useCallback } from 'react';
import classes from './Tabs.module.css';

export interface ITabObject {
  title: string;
  value: string;
  path?: string;
  params?: string | null;
}

interface ITab {
  isSelected: boolean;
  onSelect: MouseEventHandler<HTMLButtonElement>;
  children: string;
}

function Tab({ isSelected, onSelect, children }: ITab) {
  return (
    <li>
      <button
        className={`${classes.tab} ${isSelected ? classes.active : ''}`}
        onClick={onSelect}
      >
        {children}
      </button>
    </li>
  );
}

interface ITabs {
  selectedType: ITabObject | null;
  onSelectType: (type: ITabObject) => void;
  tabs: ITabObject[];
}

export default function Tabs({ selectedType, onSelectType, tabs }: ITabs) {
  const handleSelectTab = useCallback(
    (tab: ITabObject) => {
      onSelectType(tab);
    },
    [onSelectType]
  );
  return (
    <menu className={classes.tabs}>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          isSelected={selectedType?.value === tab.value}
          onSelect={() => handleSelectTab(tab)}
        >
          {tab.title}
        </Tab>
      ))}
    </menu>
  );
}
