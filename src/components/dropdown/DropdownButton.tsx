import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import classes from "./dropdown.module.css";

interface DropdownButtonProps {
  children: string | JSX.Element;
  open: boolean;
  toggle: () => void;
}

const DropdownButton = ({ children, open, toggle }: DropdownButtonProps) => {
  return (
    <div
      onClick={toggle}
      className={`${classes["dropdown-btn"]} ${
        open ? classes["button-open"] : ""
      }`}
    >
      {children}
      <span className={classes["toggle-icon"]}>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </div>
  );
};

export default DropdownButton;
