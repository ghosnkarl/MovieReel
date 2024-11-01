import DropdownButton from './DropdownButton';
import DropdownItem from './DropdownItem';
import classes from './dropdown.module.css';
import { useEffect, useRef, useState } from 'react';

export interface ItemProps {
  output: string;
  value: string;
}

interface DropdownProps {
  items: ItemProps[];
  selectedSortItem: ItemProps;
  setSelectedSortItem: (item: ItemProps) => void;
}

const Dropdown = ({
  items,
  selectedSortItem,
  setSelectedSortItem,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    const handler = ({ target }: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const handleItemClick = (item: ItemProps) => {
    setSelectedSortItem(item);
    setOpen(false);
  };

  return (
    <div className={classes.dropdown} ref={dropdownRef}>
      <DropdownButton toggle={toggleDropdown} open={open}>
        {selectedSortItem.output}
      </DropdownButton>
      <div
        className={`${classes['dropdown-content']} ${
          open ? classes['content-open'] : ''
        }`}
      >
        {items.map((item) => (
          <DropdownItem
            isSelected={item === selectedSortItem}
            onClick={() => handleItemClick(item)}
            key={item.value}
          >
            {item.output}
          </DropdownItem>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
