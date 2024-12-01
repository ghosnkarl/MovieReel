import { MdNavigateNext } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import classes from './HeaderLink.module.css';

interface HeaderLinkProps {
  title: string;
  link: string;
  linkState: unknown;
}

const HeaderLink = ({ title, link, linkState }: HeaderLinkProps) => {
  return (
    <NavLink to={link} state={linkState} className={classes.container}>
      {title}
      <MdNavigateNext className={classes.icon} />
    </NavLink>
  );
};

export default HeaderLink;
