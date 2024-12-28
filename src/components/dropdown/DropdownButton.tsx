import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import classes from './Dropdown.module.css';

interface DropdownButtonProps {
  children: string | JSX.Element;
  open: boolean;
  toggle: () => void;
}

const DropdownButton = ({ children, open, toggle }: DropdownButtonProps) => {
  return (
    <div onClick={toggle} className={classes.dropdownBtn}>
      {children}
      <span className={classes.toggleIcon}>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </div>
  );
};

export default DropdownButton;
