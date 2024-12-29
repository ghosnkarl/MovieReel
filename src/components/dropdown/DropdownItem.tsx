import classes from './Dropdown.module.css';

interface DropdownItemProps {
  isSelected: boolean;
  children: string | JSX.Element;
  onClick: () => void;
}

const DropdownItem = ({ isSelected, children, onClick }: DropdownItemProps) => {
  return (
    <div
      className={`${classes.dropdownItem} ${
        isSelected ? classes.dropdownItemSelected : ''
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
