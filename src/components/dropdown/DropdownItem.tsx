import classes from "./dropdown.module.css";

interface DropdownItemProps {
  isSelected: boolean;
  children: string | JSX.Element;
  onClick: () => void;
}

const DropdownItem = ({ isSelected, children, onClick }: DropdownItemProps) => {
  return (
    <div
      className={`${classes["dropdown-item"]} ${
        isSelected ? classes["dropdown-item--selected"] : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
