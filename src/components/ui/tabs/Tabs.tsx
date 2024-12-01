import { MouseEventHandler, useCallback } from 'react';
import { IMovie, ITVShow } from '../../../models/mediaModel';
import { IPeople } from '../../../models/peopleModel';
import { motion } from 'framer-motion';
import classes from './Tabs.module.css';

export interface ITabObject {
  title: string;
  value: string;
  query?: Promise<IMovie[] | ITVShow[] | IPeople[]>;
}

interface ITab {
  isSelected: boolean;
  onSelect: MouseEventHandler<HTMLButtonElement>;
  children: string;
  layoutId: string;
}

function Tab({ isSelected, onSelect, children, layoutId }: ITab) {
  return (
    <li>
      <button
        className={`${classes.tab} ${isSelected ? classes.active : ''}`}
        onClick={onSelect}
      >
        {children}
      </button>
      {isSelected && (
        <motion.div layoutId={layoutId} className={classes.selector} />
      )}
    </li>
  );
}

interface ITabs {
  selectedType: ITabObject | null;
  onSelectType: (type: ITabObject) => void;
  tabs: ITabObject[];
  layoutId: string;
}

export default function Tabs({
  selectedType,
  onSelectType,
  tabs,
  layoutId,
}: ITabs) {
  // Use useCallback to memoize the onSelectType handler to prevent unnecessary re-renders
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
          layoutId={layoutId}
        >
          {tab.title}
        </Tab>
      ))}
    </menu>
  );
}
