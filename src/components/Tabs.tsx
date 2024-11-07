import { MouseEventHandler } from 'react';
import { IMedia } from '../models/mediaModel';
import { IPeople } from '../models/peopleModel';
import { motion } from 'framer-motion';

interface TabsProps {
  selectedType: TabObjectProps | null;
  onSelectType: (type: TabObjectProps) => void;
  tabs: TabObjectProps[];
  layoutId: string;
}

export interface TabObjectProps {
  title: string;
  value: string;
  query?: Promise<IMedia[] | IPeople[]>;
}

interface TabProps {
  isSelected: boolean;
  onSelect: MouseEventHandler<HTMLButtonElement>;
  children: string;
  layoutId: string;
}

function Tab({ isSelected, onSelect, children, layoutId }: TabProps) {
  return (
    <li>
      <button
        className={`btn tabs--btn ${isSelected ? 'tab-active' : ''}`}
        onClick={onSelect}
      >
        {children}
      </button>
      {isSelected && (
        <motion.div layoutId={layoutId} className='tab-selector' />
      )}
    </li>
  );
}

export default function Tabs({
  selectedType,
  onSelectType,
  tabs,
  layoutId,
}: TabsProps) {
  return (
    <menu className='btn tabs'>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          isSelected={selectedType?.value === tab.value}
          onSelect={() => onSelectType(tab)}
          layoutId={layoutId}
        >
          {tab.title}
        </Tab>
      ))}
    </menu>
  );
}
