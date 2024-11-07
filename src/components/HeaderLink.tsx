import { IoArrowForwardCircle } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

interface HeaderLinkProps {
  title: string;
  link: string;
  linkState: unknown;
}

const HeaderLink = ({ title, link, linkState }: HeaderLinkProps) => {
  return (
    <NavLink to={link} state={linkState} className='section__link'>
      {title}
      <IoArrowForwardCircle className='list__header--icon' />
    </NavLink>
  );
};

export default HeaderLink;
