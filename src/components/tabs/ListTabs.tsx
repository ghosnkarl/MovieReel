import { MouseEventHandler } from "react";
import { MediaListInterface } from "../../models/mediaModel";
import { PeopleListInterface } from "../../models/peopleModel";
import { motion } from "framer-motion";

interface ListTabsProps {
  selectedType: TabOjectProps | null;
  onSelectType: (type: TabOjectProps) => void;
  tabs: TabOjectProps[];
  layoutId: string;
}

export interface TabOjectProps {
  title: string;
  value: string;
  query: Promise<MediaListInterface[] | PeopleListInterface[]>;
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
      <button className={isSelected ? "tab-active" : ""} onClick={onSelect}>
        {children}
      </button>
      {isSelected && (
        <motion.div layoutId={layoutId} className="tab-selector" />
      )}
    </li>
  );
}

export default function ListTabs({
  selectedType,
  onSelectType,
  tabs,
  layoutId,
}: ListTabsProps) {
  return (
    <menu className="tabs">
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
