import { MouseEventHandler, useCallback } from 'react';
import classes from './Tabs.module.css';

export interface TabObjectProps {
  title: string;
  value: string;
  path?: string;
  params?: string | null;
}

interface TabProps {
  isSelected: boolean;
  onSelect: MouseEventHandler<HTMLButtonElement>;
  children: string;
}

function Tab({ isSelected, onSelect, children }: TabProps) {
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
  selectedType: TabObjectProps | null;
  onSelectType: (type: TabObjectProps) => void;
  tabs: TabObjectProps[];
}

export default function Tabs({ selectedType, onSelectType, tabs }: ITabs) {
  const handleSelectTab = useCallback(
    (tab: TabObjectProps) => {
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
